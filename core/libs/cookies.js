'use strict'

module.exports = {
  parse: function ( header ) {
    var list = {}
    if ( header ) {
      header.split( ';' ).forEach( function ( cookie ) {
        var parts = cookie.split( '=' )
        list[ parts.shift().trim() ] = decodeURI( parts.join( '=' ) )
      } )
    }
    return list
  },
  format: function ( key, value, path, expires, secure, httpOnly ) {
    var cookie = []
    cookie.push( key + '=' + encodeURI( value ) )
    path = path || '/'
    cookie.push( 'path=' + path )
    if ( expires ) {
      cookie.push( 'expires=' + expires )
    }
    if ( secure ) {
      cookie.push( 'secure' )
    }
    if ( httpOnly ) {
      cookie.push( 'HttpOnly' )
    }
    return cookie.join( '; ' )
  }
}
