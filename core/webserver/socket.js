'use strict'

const WebSocketServer = require( 'ws' ).Server

const fExtendRequest = require( __dirname + '/../libs/fExtendRequest' )
const SocketRouteClass = require( __dirname + '/../libs/SocketRouteClass' )

module.exports = ( config, server ) => {
  let ws = new WebSocketServer( {
    server: server
  } )
  // Process request

  ws.on( 'connection', ( wsSocket, req ) => {
    fExtendRequest( req )

    // Load requested route
    let instance = null
    let Route = config.get( 'socketRoutes' )( req.url )
    if ( Route && ( Route.prototype instanceof SocketRouteClass ) ) {
      instance = new Route( req )
    } else {
      wsSocket.terminate()
      return
    }

    let executeMiddlewares = ( middlewares, wsSocket, request, cb ) => {
      let executeMiddleware = ( i ) => {
        if ( middlewares.length > i ) {
          middlewares[ i ]( wsSocket, request, () => {
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
      executeMiddlewares( instance.middlewares, wsSocket, req, () => {
        wsSocket.on( 'close', () => {
          instance.terminate()
        } )
        wsSocket.on( 'message', ( message ) => {
          instance.onmessage(
            message,
            ( data ) => {
              wsSocket.send( data )
            },
            () => {
              wsSocket.terminate()
            } )
        } )
        // Once middlewares have been executed, execute the route
        instance.execute(
          ( data ) => {
            wsSocket.send( data )
          },
          () => {
            wsSocket.terminate()
          }
        )
      } )
    } )
  } )
}
