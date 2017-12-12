'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class HttpRouteClass extends RouteClass {
  execute ( callback, errorCallback ) {
    errorCallback( 501 )
  }
}

module.exports = HttpRouteClass
