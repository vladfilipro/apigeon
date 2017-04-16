'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class HttpRouteClass extends RouteClass {

  constructor ( config, request, connection ) {
    super( config, request, connection )
    this.middlewares = []
  }

  methodAllowed ( method ) {
    return [ 'GET', 'POST', 'PUT', 'DELETE' ].indexOf( method ) > -1
  }

}

module.exports = HttpRouteClass
