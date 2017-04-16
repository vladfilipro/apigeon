'use strict'

const url = require( 'url' )

const utils = require( __dirname + '/../utils' )

const CookieClass = require( __dirname + '/CookieClass' )

class ConfigClass {

  constructor ( config ) {
    this.data = utils.extend( {
      httpRoutesPath: '',
      socketRoutesPath: '',
      mode: {
        http: true,
        socket: true
      },
      server: null,
      rewrite: ( url ) => {
        return url
      },
      httpsOptions: null
    }, ( config instanceof ConfigClass ) ? config.get() : config )
  }

  get ( prop ) {
    if ( prop ) {
      return this.data[ prop ]
    }
    return this.data
  }

  extendRequest ( req ) {
    // extend the req object
    let newUrl = this.data[ 'rewrite' ]( req.url )
    let location = url.parse( newUrl, true )
    req.apigeon = {
      connection: req.socket.id,
      url: newUrl,
      pathname: location.pathname,
      method: req.method,
      protocol: req.protocol || ( req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' ) ),
      cookies: CookieClass.getCookiesFromHeader( req.headers.cookie ),
      query: location.query || {}
    }
  }
}

module.exports = ConfigClass
