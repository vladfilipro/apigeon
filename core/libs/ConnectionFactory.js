'use strict'

const utils = require( __dirname + '/../utils' )

const Connection = require( __dirname + '/ConnectionClass' )

class ConnectionFactory {

  constructor () {
    this.connections = {}
  }

  outputConnections () {
    utils.logger.log( '( ' + Object.keys( this.connections ).length + ' active connections )' )
  }

  createConnection ( socket ) {
    let connection = new Connection( socket )
    connection.onClose( () => {
      delete this.connections[ connection.id ]
      this.outputConnections()
    } )
    this.connections[ connection.id ] = connection
    this.outputConnections()
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
