'use strict'

const utils = require( __dirname + '/../utils' )

class ConnectionClass {

  constructor ( socket ) {
    this.id = utils.uid()
    socket.apigeon = socket.apigeon || {}
    socket.apigeon.socketId = this.id
    this.socket = socket

    utils.logger.log( '#' + this.id + ' - open - ' + socket.remoteAddress )

    socket.on( 'close', () => {
      utils.logger.log( '#' + this.id + ' - close - ' + socket.remoteAddress )
      if ( typeof this.onClose === 'function' ) {
        this.onClose()
      }
    } )
  }

  onClose ( cb ) {
    this.onClose = cb
  }

  close () {
    this.socket.destroy()
  }
}

module.exports = ConnectionClass
