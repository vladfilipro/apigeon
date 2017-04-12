'use strict'

class CookieClass {

  constructor ( key, value, path, expires, secure, httpOnly ) {
    this.key = key
    this.value = value
    this.path = path || '/'
    this.expires = expires
    this.secure = !!secure
    this.httpOnly = !!httpOnly
  }

  // Incoming cookies only have key / value pair
  static getCookiesFromHeader ( header ) {
    let cookies = []
    if ( header ) {
      header.split( ';' ).forEach( ( cookie ) => {
        var parts = cookie.split( '=' )
        cookies.push( new CookieClass( parts.shift().trim(), decodeURI( parts.join( '=' ) ) ) )
      } )
    }
    return cookies
  }

  // Outgoing cookies have more relevant data like : path , expires , secure and httponly
  getHeaderString () {
    let cookie = []
    cookie.push( this.key + '=' + encodeURI( this.value ) )
    cookie.push( 'path=' + this.path )
    if ( this.expires ) {
      cookie.push( 'expires=' + this.expires )
    }
    if ( this.secure ) {
      cookie.push( 'secure' )
    }
    if ( this.httpOnly ) {
      cookie.push( 'HttpOnly' )
    }
    return cookie.join( '; ' )
  }
}

module.exports = CookieClass
