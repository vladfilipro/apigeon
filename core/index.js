'use strict'

const http = require( 'http' )

const utils = require( __dirname + '/utils' )

const ConfigClass = require( __dirname + '/libs/ConfigClass' )

const HttpRouteClass = require( __dirname + '/libs/HttpRouteClass' )
const SocketRouteClass = require( __dirname + '/libs/SocketRouteClass' )

module.exports = class Apigeon {
  static get classes () {
    return {
      HttpRouteClass: HttpRouteClass,
      SocketRouteClass: SocketRouteClass
    }
  }

  constructor ( options ) {
    this.config = new ConfigClass( options )

    this.__server = this.config.get( 'server' ) || http.createServer()
    this.__server.timeout = this.config.get( 'timeout' )

    // Register all connections
    this.__connections = {}
    this.__server.on( 'connection', ( socket ) => {
      socket.uid = utils.uid()
      socket.on( 'close', () => {
        delete this.__connections[ socket.uid ]
      } )
      this.__connections[ socket.uid ] = socket
    } )

    // Enable server mode
    let modes = this.config.get( 'mode' )
    Object.keys( modes ).forEach( ( key ) => {
      if ( modes[ key ] ) {
        require( __dirname + '/webserver/' + key )( this.config, this.__server )
      }
    } )
  }

  start ( port, done ) {
    this.__server.listen( port, () => {
      if ( typeof done === 'function' ) {
        done()
      }
    } )
  }

  stop ( done ) {
    if ( this.__server.listening ) {
      Object.keys( this.__connections ).forEach( ( id ) => {
        this.__connections[ id ].destroy()
      } )
      this.__server.close( () => {
        if ( typeof done === 'function' ) {
          done()
        }
      } )
    } else {
      if ( typeof done === 'function' ) {
        done()
      }
    }
  }
}
