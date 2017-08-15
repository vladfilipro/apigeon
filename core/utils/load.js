'use strict'

const path = require( 'path' )

const logger = require( __dirname + '/logger.js' )

module.exports = ( filename, paths ) => {
  if ( Array.isArray( paths ) ) {
    for ( var i = 0; i < paths.length; i++ ) {
      try {
        return require( path.join( paths[ i ], filename ) )
      } catch ( e ) {
        logger.error( e )
        continue
      }
    }
  } else {
    try {
      return require( path.join( paths, filename ) )
    } catch ( e ) {
      logger.error( e )
    }
  }
  try {
    return require( filename )
  } catch ( e ) {
    logger.error( e )
    return false
  }
}
