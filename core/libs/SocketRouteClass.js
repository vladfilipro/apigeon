'use strict'

const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {

  methodAllowed ( method ) {
    return method === 'SOCKET'
  }

  close () {
    this.connection.close()
  }

}

module.exports = SocketRouteClass
