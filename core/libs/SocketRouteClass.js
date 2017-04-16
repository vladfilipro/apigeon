'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {

  methodAllowed ( method ) {
    return method === 'SOCKET'
  }

}

module.exports = SocketRouteClass
