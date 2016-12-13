'use strict'

var path = require( 'path' )
var fs = require( 'fs' )

var appendTrailingSlash = function ( path ) {
  if ( path.substr( path.length - 1, 1 ) !== '/' ) {
    return path + '/'
  }
  return path
}

var exists = function ( filename ) {
  try {
    fs.accessSync( path.resolve( filename ), fs.constants.R_OK )
    return true
  } catch ( e ) {
    return false
  }
}

var load = function ( filename ) {
  try {
    return require( filename )
  } catch ( e ) {
    return false
  }
}

module.exports = function ( filename, paths ) {
  var possibleFile
  if ( Array.isArray( paths ) ) {
    for ( var i = 0; i < paths.length; i++ ) {
      possibleFile = appendTrailingSlash( paths[ i ] ) + filename
      if ( exists( possibleFile ) ) {
        return load( possibleFile )
      } else {
        continue
      }
    }
  } else {
    possibleFile = appendTrailingSlash( paths ) + filename
    if ( exists( possibleFile ) ) {
      return load( possibleFile )
    } else {
      return null
    }
  }
}
