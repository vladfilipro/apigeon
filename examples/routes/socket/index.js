'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {
  onmessage ( data, cb ) {
    cb( 'Params: ' + JSON.stringify( this.request.query ) + '\n\r' + data )
  }

  execute ( cb ) {
    cb( 'CONNECTED' )
  }

  terminate () {
    console.log( 'Instance terminated.' )
  }
}
