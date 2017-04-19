'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    cb( 'Hello world!', 200, { 'Content-Type': 'text/html' } )
  }

}
