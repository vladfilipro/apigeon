'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {

  execute ( data, cb ) {
    cb( 'Params: ' + JSON.stringify( this.request.apigeon.query ) + '\n\r' + data )
  }

}
