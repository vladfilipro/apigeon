'use strict'

const utils = require( __dirname + '/../utils' )

class ConnectionClass {

  constructor ( socket ) {
    this.id = utils.uid()
    this.status = 1
    socket.apigeon = socket.apigeon || {}
    socket.apigeon.connectionId = this.id
    this.socket = socket
    socket.on( 'close', () => {
      this.status = 0
    } )
  }

  close () {
    this.socket.destroy()
  }
}

module.exports = ConnectionClass
