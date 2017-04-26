'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )
const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {

  methodAllowed ( method ) {
    return method === 'SOCKET'
  }

  execute ( data, callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

}

module.exports = SocketRouteClass
