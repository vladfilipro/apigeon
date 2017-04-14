'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class HttpRouteClass extends RouteClass {

  methodAllowed ( method ) {
    return [ 'GET', 'POST', 'PUT', 'DELETE' ].indexOf( method ) > -1
  }

}

module.exports = HttpRouteClass
