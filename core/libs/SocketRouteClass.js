'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {
  onmessage ( data, callback, end ) {
    end()
  }

  execute ( callback, end ) {
    end()
  }
}

module.exports = SocketRouteClass
