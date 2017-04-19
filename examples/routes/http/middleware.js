'use strict'

const Apigeon = require( './../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  setup ( done ) {
    this.middlewares.push( ( req, res, cb ) => {
      res.write( 'Hello from the middleware.\n\r', cb )
    } )
    done()
  }

  execute ( cb ) {
    cb( 'cookies: ' + JSON.stringify( this.request.apigeon.cookies ) + ' ; params: ' + JSON.stringify( this.request.apigeon.query ) )
  }

}
