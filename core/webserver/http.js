'use strict'

const utils = require( __dirname + '/../utils' )
const fExtendRequest = require( __dirname + '/../libs/fExtendRequest' )
const HttpRouteClass = require( __dirname + '/../libs/HttpRouteClass' )

module.exports = ( config, server ) => {
  // Process request

  server.on( 'request', ( req, res ) => {
    fExtendRequest( req )

    // Load requested route
    let instance = null
    let Route = config.get( 'httpRoutes' )( req.url )
    if ( Route && ( Route.prototype instanceof HttpRouteClass ) ) {
      instance = new Route( req )
    } else {
      res.statusCode = 404
      res.end()
      req.socket.destroy()
      return
    }

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

    // Call setup method
    instance.setup( () => {
      // Execute middlewares defined in the route once setup is done
      executeMiddlewares( instance.middlewares, req, res, () => {
        res.on( 'finish', () => {
          instance.terminate()
        } )
        // Once middlewares have been executed, execute the route
        instance.execute(
          ( data, code, headers ) => {
            res.statusCode = code || 200
            if ( utils.isObject( headers ) ) {
              var headerNames = Object.keys( headers )
              for ( var i = 0, l = headerNames.length; i < l; i++ ) {
                res.setHeader( headerNames[ i ], headers[ headerNames[ i ] ] )
              }
            }
            res.end( data || ' ' )
            req.socket.destroy()
          }
        )
      } )
    } )
  } )
}
