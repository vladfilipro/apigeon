'use strict'

const WebSocketServer = require( 'ws' ).Server

const utils = require( __dirname + '/../utils' )

const RouteClass = require( __dirname + '/../libs/RouteClass' )

module.exports = ( config, error ) => {
  // Return a mode function
  return ( server, middlewares ) => {
    // Process request
    server.on( 'request', ( req, res ) => {
      // Execute external middlewares
      middlewares( req, res )
    } )

    let ws = new WebSocketServer( {
      server: server
    } )

    ws.on( 'connection', ( socket ) => {
      let req = socket.upgradeReq

      // Load requested route
      let Route = utils.load( req.apigeon.pathname, config.get( 'routesPath' ) )
      let instance = null

      let failed = false
      if ( Route && ( Route.prototype instanceof RouteClass ) ) {
        instance = new Route( config, req )
        if ( !instance.methodAllowed( 'socket' ) ) {
          failed = error( 405 )
        }
        if ( !instance.protocolAllowed( req.protocol.toLowerCase() ) ) {
          failed = error( 403 )
        }
      } else {
        failed = error( 404 )
      }
      if ( failed ) {
        socket.send( error.getMessage() )
        socket.close()
        return
      }

      socket.on( 'message', ( message ) => {
        req.body = message
        instance.execute( ( data ) => {
          socket.send( data )
        }, ( error ) => {
          socket.send( error.getMessage() )
        } )
      } )

      socket.on( 'close', () => {
        instance.terminate()
      } )
    } )
  }
}
