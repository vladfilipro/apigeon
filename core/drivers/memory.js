'use strict'

module.exports = {
  insert: function ( table, primary, data, cb ) {
    global[ table ] = global[ table ] || {}

    if ( global[ table ][ primary ] ) {
      cb( 'Invalid primary key. Not unique', null )
      return
    }

    var record = {}

        // We do not want to keep references, we want string values.
    Object.keys( data ).forEach( function ( key ) {
      record[ key ] = ( typeof data[ key ] === 'object' ) ? JSON.parse( JSON.stringify( data[ key ] ) ) : data[ key ]
    } )

    global[ table ][ primary ] = record
    cb( null, 'Values inserted into ' + table )
  },
  update: function ( table, primary, data, cb ) {
    global[ table ] = global[ table ] || {}

    if ( !global[ table ][ primary ] ) {
      cb( null, 'No updated values' )
      return
    }

    var record = global[ table ][ primary ]
    Object.keys( data ).forEach( function ( key ) {
      record[ key ] = ( typeof data[ key ] === 'object' ) ? JSON.parse( JSON.stringify( data[ key ] ) ) : data[ key ]
    } )

    cb( null, 'Values updated for key ' + primary )
  },
  select: function ( table, primary, cb ) {
    global[ table ] = global[ table ] || {}

    if ( !global[ table ][ primary ] ) {
      cb( null, 'Primary key does not exist' )
      return
    }

    cb( null, global[ table ][ primary ] )
  },
  delete: function ( table, primary, cb ) {
    global[ table ] = global[ table ] || {}

    if ( !global[ table ][ primary ] ) {
      cb( null, 'Primary key does not exist' )
      return
    }

    delete global[ table ][ primary ]
    cb( null, 'Record with key ' + primary + ' deleted' )
  }
}
