'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {
  execute ( cb, ecb ) {
    ecb( 'There was an error' )
  }
}
