'use strict'

var appendTrailingSlash = function ( path ) {
  if ( path.substr( path.length - 1, 1 ) !== '/' ) {
    return path + '/'
  }
  return path
}

module.exports = function ( filename, paths ) {
  if ( Array.isArray( paths ) ) {
    for ( var i = 0; i < paths.length; i++ ) {
      try {
        return require( appendTrailingSlash( paths[ i ] ) + filename )
      } catch ( e ) {
        continue
      }
    }
  }
  try {
    return require( filename )
  } catch ( e ) {
    return null
  }
}
