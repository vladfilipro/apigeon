'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class HttpRouteClass extends RouteClass {
  execute ( callback ) {
    callback( '', 501 )
  }
}

module.exports = HttpRouteClass
