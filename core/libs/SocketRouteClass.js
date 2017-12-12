'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {
  onmessage ( data, callback, errorCallback ) {
    errorCallback()
  }

  execute ( callback, errorCallback ) {
    errorCallback()
  }
}

module.exports = SocketRouteClass
