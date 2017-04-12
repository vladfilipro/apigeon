'use strict'

const path = require( 'path' )

module.exports = ( filename, paths ) => {
  if ( Array.isArray( paths ) ) {
    for ( var i = 0; i < paths.length; i++ ) {
      try {
        return require( path.join( paths[ i ], filename ) )
      } catch ( e ) {
        console.log( 'Failed to resolve: ', filename, ' from ', path.join( paths[ i ], filename ) )
        continue
      }
    }
  } else {
    try {
      return require( path.join( paths, filename ) )
    } catch ( e ) {
      console.log( 'Failed to resolve: ', filename, ' from ', path.join( paths, filename ) )
    }
  }
  try {
    return require( filename )
  } catch ( e ) {
    console.log( 'Failed to resolve: ', filename, ' from ', paths )
    return false
  }
}
