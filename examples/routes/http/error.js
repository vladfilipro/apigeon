'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {
  execute ( cb, ecb ) {
    ecb( 'There was an internal error', 500 )
  }
}
