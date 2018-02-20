'use strict'

const WebSocketServer = require( 'ws' ).Server

const fExtendRequest = require( __dirname + '/../libs/fExtendRequest' )
const SocketRouteClass = require( __dirname + '/../libs/SocketRouteClass' )

module.exports = ( config, server ) => {
  let ws = new WebSocketServer( {
    server: server,
    verifyClient: ( info, done ) => {
      let req = info.req
      fExtendRequest( req )

      // Load requested route
      let instance = null
      let Route = config.get( 'socketRoutes' )( req.url )
      if ( Route && ( Route.prototype instanceof SocketRouteClass ) ) {
        instance = new Route( req )
      } else {
        done( false, 404 )
        return
      }

      let executeMiddlewares = ( middlewares, request, end, cb ) => {
        let executeMiddleware = ( i ) => {
          if ( middlewares.length > i ) {
            middlewares[ i ]( request, end, () => {
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
        executeMiddlewares( instance.middlewares, req,
          ( statusCode ) => {
            done( false, statusCode )
          }
          , () => {
            req.__route = instance
            done( true )
          } )
      } )
    },
    clientTracking: false,
    maxPayload: config.get( 'maxPayload' )
  } )

  // Connection established
  ws.on( 'connection', ( wsSocket, req ) => {
    wsSocket.on( 'error', () => {
      req.__route.terminate()
    } )
    wsSocket.on( 'close', () => {
      req.__route.terminate()
    } )
    wsSocket.on( 'message', ( message ) => {
      req.__route.onmessage(
        message,
        ( data ) => {
          wsSocket.send( data )
        },
        () => {
          wsSocket.terminate()
        } )
    } )
    // Once middlewares have been executed, execute the route
    req.__route.execute(
      ( data ) => {
        wsSocket.send( data )
      },
      () => {
        wsSocket.terminate()
      }
    )
  } )
}
