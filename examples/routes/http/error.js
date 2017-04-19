'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb, ecb ) {
    ecb( new Apigeon.classes.ErrorClass( 500 ) )
  }

}
