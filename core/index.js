'use strict'

const http = require( 'http' )
const https = require( 'https' )

const ConfigClass = require( __dirname + '/libs/ConfigClass' )
const ErrorClass = require( __dirname + '/libs/ErrorClass' )

const ConnectionFactory = require( __dirname + '/libs/ConnectionFactory' )

const HttpRouteClass = require( __dirname + '/libs/HttpRouteClass' )
const SocketRouteClass = require( __dirname + '/libs/SocketRouteClass' )

module.exports = class Apigeon {

  static get classes () {
    return {
      HttpRouteClass: HttpRouteClass,
      SocketRouteClass: SocketRouteClass,
      ErrorClass: ErrorClass
    }
  }

  constructor ( options ) {
    this.config = new ConfigClass( options )

    this.__server = this.config.get( 'server' ) || null
    this.__connections = new ConnectionFactory()

    // Create server
    if ( !this.__server ) {
      if ( !this.config.get( 'httpsOptions' ) ) {
        this.__server = http.createServer()
      } else {
        this.__server = https.createServer( this.config.get( 'httpsOptions' ) )
      }
    }

    // Register all connections
    this.__server.on( 'connection', ( socket ) => {
      this.__connections.createConnection( socket )
    } )

    // Enable server mode
    let modes = this.config.get( 'mode' )
    Object.keys( modes ).forEach( ( key ) => {
      if ( modes[ key ] ) {
        require( __dirname + '/webserver/' + key )( this.config, this.__server, this.__connections )
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
      this.__connections.close()
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
