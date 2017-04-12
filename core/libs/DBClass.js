'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )

class DBClass {

  constructor ( dbname ) {
    this.dbname = dbname || 'default'
    this.store = {}
    global[ this.dbname ] = this.store
  }

  destructor () {
    delete global[ this.dbname ]
  }

  insert ( table, primary, data, cb ) {
    this.store[ table ] = this.store[ table ] || {}

    if ( this.store[ table ][ primary ] ) {
      cb( new ErrorClass( null, 'Invalid primary key. Not unique' ), null )
      return
    }

    var record = {}

    // We do not want to keep references, we want string values.
    Object.keys( data ).forEach( ( key ) => {
      record[ key ] = ( typeof data[ key ] === 'object' ) ? JSON.parse( JSON.stringify( data[ key ] ) ) : data[ key ]
    } )

    this.store[ table ][ primary ] = record
    cb( null, 'Values inserted into ' + table )
  }

  update ( table, primary, data, cb ) {
    this.store[ table ] = this.store[ table ] || {}

    if ( !this.store[ table ][ primary ] ) {
      cb( null, 'No updated values' )
      return
    }

    var record = this.store[ table ][ primary ]
    Object.keys( data ).forEach( ( key ) => {
      record[ key ] = ( typeof data[ key ] === 'object' ) ? JSON.parse( JSON.stringify( data[ key ] ) ) : data[ key ]
    } )

    cb( null, 'Values updated for key ' + primary )
  }

  select ( table, primary, cb ) {
    this.store[ table ] = this.store[ table ] || {}

    if ( !this.store[ table ][ primary ] ) {
      cb( null, undefined )
      return
    }

    cb( null, this.store[ table ][ primary ] )
  }

  delete ( table, primary, cb ) {
    this.store[ table ] = this.store[ table ] || {}

    if ( !this.store[ table ][ primary ] ) {
      cb( null, 'Primary key does not exist' )
      return
    }

    delete this.store[ table ][ primary ]
    cb( null, 'Record with key ' + primary + ' deleted' )
  }
}

module.exports = DBClass
