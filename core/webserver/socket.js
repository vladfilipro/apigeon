'use strict'

const WebSocketServer = require( 'ws' ).Server

const utils = require( __dirname + '/../utils' )

const ErrorClass = require( __dirname + '/../libs/ErrorClass' )

const SocketRouteClass = require( __dirname + '/../libs/SocketRouteClass' )

module.exports = ( config, server, connections ) => {
  let ws = new WebSocketServer( {
    server: server
  } )

  ws.on( 'connection', ( socket, req ) => {
    config.extendRequest( req )

    let connection = connections.getConnectionFromRequest( req )

    req.apigeon.method = 'SOCKET'

    // Load requested route
    let Route = utils.load( req.apigeon.pathname, config.get( 'socketRoutesPath' ) )
    let instance = null

    let failed = false
    if ( Route && ( Route.prototype instanceof SocketRouteClass ) ) {
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
      connection.close()
      return
    }

    let executeMiddlewares = ( middlewares, socket, request, cb ) => {
      let executeMiddleware = ( i ) => {
        if ( middlewares.length > i ) {
          middlewares[ i ]( socket, request, () => {
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

    instance.setup( () => {
      executeMiddlewares( instance.middlewares, socket, req, () => {
        instance.hasAccess( () => {
          socket.on( 'message', ( message ) => {
            instance.onmessage(
            message,
            ( data ) => {
              socket.send( data )
            }, ( error ) => {
              socket.send( 'ERROR ' + error.getCode() + ' : ' + error.getMessage() )
              connection.close()
            } )
          } )
          socket.on( 'close', () => {
            instance.terminate()
          } )
          instance.execute(
          ( data ) => {
            socket.send( data )
          }, ( error ) => {
            socket.send( 'ERROR ' + error.getCode() + ' : ' + error.getMessage() )
            connection.close()
          } )
        }, () => {
          let err = new ErrorClass( 403 )
          socket.send( err.getMessage() )
          connection.close()
        } )
      } )
    } )
  } )
}
