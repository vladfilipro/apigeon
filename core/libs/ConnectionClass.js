'use strict'

const utils = require( __dirname + '/../utils' )

class ConnectionClass {
  constructor ( socket ) {
    this.id = utils.uid()
    socket.apigeon = socket.apigeon || {}
    socket.apigeon.connection = this
    this.socket = socket
  }

  close () {
    this.socket.destroy()
  }
}

module.exports = ConnectionClass
