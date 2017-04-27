'use strict'

const utils = require( __dirname + '/../utils' )

const ErrorClass = require( __dirname + '/../libs/ErrorClass' )

const HttpRouteClass = require( __dirname + '/../libs/HttpRouteClass' )

module.exports = ( config, server, connections ) => {
  // Process request
  server.on( 'request', ( req, res ) => {
    config.extendRequest( req )

    let connection = connections.getConnectionFromRequest( req )

    // Load requested route
    let Route = utils.load( req.apigeon.pathname, config.get( 'httpRoutesPath' ) )
    let instance = null
    let failed = false
    if ( Route && ( Route.prototype instanceof HttpRouteClass ) ) {
      instance = new Route( config, req, connection )
      if ( !instance.methodAllowed( req.apigeon.method.toUpperCase() ) ) {
        failed = new ErrorClass( 405 )
      }
      if ( !instance.protocolAllowed( req.apigeon.protocol.toUpperCase() ) ) {
        failed = new ErrorClass( 403 )
      }
    } else {
      failed = new ErrorClass( 404 )
    }
    if ( failed ) {
      utils.logger.log( '#' + connection.id + ' - HTTP request fail ' + failed.getCode() + ' - ' + req.apigeon.method + ' - ' + req.apigeon.protocol + ' - ' + req.apigeon.pathname )
      res.statusCode = failed.getCode()
      res.end( failed.getMessage() )
      connection.close()
      return
    }

    utils.logger.log( '#' + connection.id + ' - HTTP request success 200 - ' + req.apigeon.method + ' - ' + req.apigeon.protocol + ' - ' + req.apigeon.pathname )

    let executeMiddlewares = ( middlewares, request, response, cb ) => {
      let executeMiddleware = ( i ) => {
        if ( middlewares.length > i ) {
          middlewares[ i ]( request, response, () => {
            executeMiddleware( i + 1 )
          } )
        } else {
          if ( typeof cb === 'function' ) {
            cb()
          }
        }
      }
      executeMiddleware( 0 )
    }

    var proccessRequest = ( data, code, headers ) => {
      res.statusCode = code
      if ( utils.isObject( headers ) ) {
        var headerNames = Object.keys( headers )
        for ( var i = 0, l = headerNames.length; i < l; i++ ) {
          res.setHeader( headerNames[ i ], headers[ headerNames[ i ] ] )
        }
      }
      instance.terminate()
      res.end( data )
      connection.close()
    }

    instance.setup( () => {
      executeMiddlewares( instance.middlewares, req, res, () => {
        if ( !instance.hasAccess() ) {
          let err = new ErrorClass( 403 )
          res.statusCode = err.getCode()
          res.end( err.getMessage() )
          connection.close()
          return
        }
        instance.execute( ( data, code, headers ) => {
          proccessRequest( data, code || 200, headers )
        }, ( error ) => {
          proccessRequest( error.getMessage(), error.getCode() )
        } )
      } )
    } )
  } )
}
