'use strict'

const url = require( 'url' )
const http = require( 'http' )
const https = require( 'https' )

const utils = require( __dirname + '/utils' )

const ConfigClass = require( __dirname + '/libs/ConfigClass' )
const ErrorClass = require( __dirname + '/libs/ErrorClass' )

module.exports = class Apigeon {

  static classes () {
    return {
      RouteClass: require( __dirname + '/libs/RouteClass' ),
      ErrorClass: require( __dirname + '/libs/ErrorClass' )
    }
  }

  constructor ( options ) {
    this.config = new ConfigClass( options )
    console.log( 'Configuration: ', this.config.get() )

    this.__server = null
    this.__middlewares = []
    this.__connections = {}

    // Create server
    if ( !this.config.get( 'httpsOptions' ) ) {
      this.__server = http.createServer()
    } else {
      this.__server = https.createServer( this.config.get( 'httpsOptions' ) )
    }

    // Register all connections
    this.__server.on( 'connection', ( socket ) => {
      let id = utils.uid()
      this.__connections[ id ] = socket
      socket.on( 'close', () => {
        delete this.__connections[ id ]
      } )
    } )

    let executeMiddlewares = ( req, res, cb ) => {
      // extend request
      let newUrl = this.config.get( 'rewrite' )( req.url )
      let location = url.parse( newUrl, true )
      req.apigeon = {
        url: newUrl,
        pathname: location.pathname,
        protocol: req.protocol || ( req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' ) ),
        query: location.query
      }
      req.pathname = req.pathname || location.pathname
      req.protocol = req.protocol || ( req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' ) )
      req.query = req.query || location.query

      // run middlewares
      let executeMiddleware = ( i ) => {
        i = i || 0
        if ( this.__middlewares.length > i ) {
          if ( this.__middlewares[ i ].route.test( req.apigeon.url ) ) {
            this.__middlewares[ i ].middleware( req, res, () => {
              executeMiddleware( i + 1 )
            } )
          }
        } else {
          if ( typeof cb === 'function' ) {
            cb()
          }
        }
      }
      executeMiddleware()
    }

    let error = ( code ) => {
      let message = utils.isObject( this.config.get( 'httpErrors' ) ) ? this.config.get( 'httpErrors' )[ code ] : null
      return new ErrorClass( code, message )
    }

    // Enable server mode
    let modes = this.config.get( 'mode' )
    Object.keys( modes ).forEach( ( key ) => {
      if ( modes[ key ] ) {
        require( __dirname + '/webserver/' + key )( this.config, error )( this.__server, executeMiddlewares )
      }
    } )
  }

  start ( port, done ) {
    this.__server.listen( port, done )
  }

  stop ( done ) {
    if ( this.__server.listening ) {
      for ( let i = 0, keys = Object.keys( this.__connections ), l = keys.length; i < l; i++ ) {
        this.__connections[ keys[ i ] ].destroy()
      }
      this.__server.close( done )
    } else {
      done()
    }
  }

  addMiddleware ( routeRegexp, middleware, id ) {
    id = id || utils.uid()
    if ( !( routeRegexp instanceof RegExp ) ) {
      routeRegexp = new RegExp( routeRegexp || '.*', 'gi' )
    }
    if ( typeof middleware === 'function' ) {
      this.__middlewares.push( { route: routeRegexp, middleware: middleware, id: id } )
    }
    return id
  }

  removeMiddleware ( id ) {
    this.__middlewares = this.__middlewares.filter( ( value ) => {
      return value.id === id
    } )
  }

  // var predefinedMiddlewares = {
  //   session: function ( sessionConfig ) {
  //     return require( __dirname + '/webserver/middlewares/session' )( config, sessionConfig )
  //   },
  //   logs: function ( logsConfig ) {
  //     return require( __dirname + '/webserver/middlewares/logs' )( config, logsConfig )
  //   }
  // }
  //
  // this.__middlewares = predefinedMiddlewares
}
