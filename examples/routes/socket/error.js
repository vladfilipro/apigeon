'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {
  execute ( cb, end ) {
    cb( 'There was an error!' )
    end()
  }
}
