'use strict'

const utils = require( __dirname + '/../utils' )

const RouteClass = require( __dirname + '/../libs/RouteClass' )

module.exports = ( config, error ) => {
  // Return a mode function
  return ( server, middlewares ) => {
    // Process request
    server.on( 'request', ( req, res ) => {
      // Execute external middlewares first
      middlewares( req, res, () => {
        // Load requested route
        let Route = utils.load( req.apigeon.pathname, config.get( 'routesPath' ) )
        let instance = null

        let failed = false
        if ( Route && ( Route.prototype instanceof RouteClass ) ) {
          instance = new Route( config, req )
          if ( !instance.methodAllowed( req.method.toLowerCase() ) ) {
            failed = error( 405 )
          }
          if ( !instance.protocolAllowed( req.protocol.toLowerCase() ) ) {
            failed = error( 403 )
          }
        } else {
          failed = error( 404 )
        }
        if ( failed ) {
          res.statusCode = failed.getCode()
          res.end( failed.getMessage() )
          return
        }

        var proccessRequest = ( data, code, headers ) => {
          res.statusCode = code
          if ( utils.isObject( headers ) ) {
            var headerNames = Object.keys( headers )
            for ( var i = 0, l = headerNames.length; i < l; i++ ) {
              res.setHeader( headerNames[ i ], headers[ headerNames[ i ] ] )
            }
          }
          res.end( data )
        }

        instance.execute( ( data, code, headers ) => {
          proccessRequest( data, code, headers )
          instance.terminate()
        }, ( error ) => {
          proccessRequest( error.getMessage(), error.getCode() )
          instance.terminate()
        } )
      } )
    } )
  }
}
