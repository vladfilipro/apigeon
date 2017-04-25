'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )
const RouteClass = require( __dirname + '/RouteClass' )

class HttpRouteClass extends RouteClass {

  constructor ( config, request, connection ) {
    super( config, request, connection )
    this.middlewares = []
  }

  methodAllowed ( method ) {
    return [ 'GET', 'POST', 'PUT', 'DELETE' ].indexOf( method ) > -1
  }

  execute ( callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

}

module.exports = HttpRouteClass
