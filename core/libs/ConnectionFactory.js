'use strict'

const utils = require( __dirname + '/../utils' )

const Connection = require( __dirname + '/ConnectionClass' )

class ConnectionFactory {

  constructor () {
    this.connections = {}
  }

  createConnection ( socket ) {
    let connection = new Connection( socket )
    socket.on( 'close', () => {
      delete this.connections[ connection.id ]
    } )
    this.connections[ connection.id ] = connection
    return connection
  }

  count () {
    return Object.keys( this.connections )
  }

  close () {
    for ( let i = 0, keys = Object.keys( this.connections ), total = keys.length; i < total; i++ ) {
      this.connections[ keys[ i ] ].close()
    }
  }

  getConnectionFromId ( id ) {
    if ( this.connections[ id ] ) {
      return this.connections[ id ]
    }
    return null
  }

  getConnectionFromRequest ( req ) {
    if ( utils.isObject( req ) && utils.isObject( req.socket ) && utils.isObject( req.socket.apigeon ) ) {
      return this.getConnectionFromId( req.socket.apigeon.connectionId )
    }
    return null
  }
}

module.exports = ConnectionFactory
