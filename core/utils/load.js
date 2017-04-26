'use strict'

const path = require( 'path' )

const environment = require( __dirname + '/environment.js' )
const logger = require( __dirname + '/logger.js' )

let processError = ( e ) => {
  if ( e.code !== 'MODULE_NOT_FOUND' ) {
    logger.error( e )
  } else {
    if ( environment.isDevelopment() ) {
      logger.warn( e )
    }
  }
}

module.exports = ( filename, paths ) => {
  if ( Array.isArray( paths ) ) {
    for ( var i = 0; i < paths.length; i++ ) {
      try {
        return require( path.join( paths[ i ], filename ) )
      } catch ( e ) {
        processError( e )
        continue
      }
    }
  } else {
    try {
      return require( path.join( paths, filename ) )
    } catch ( e ) {
      processError( e )
    }
  }
  try {
    return require( filename )
  } catch ( e ) {
    processError( e )
    return false
  }
}
