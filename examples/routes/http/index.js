'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    cb( 'Hello world! Query params: ' + JSON.stringify( this.request.apigeon.query ), 200, { 'Content-Type': 'text/html' } )
  }

  terminate () {
    console.log( 'Connection has ended.' )
  }

}
