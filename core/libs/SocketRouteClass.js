'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )
const RouteClass = require( __dirname + '/RouteClass' )

class SocketRouteClass extends RouteClass {

  methodAllowed ( method ) {
    return method === 'SOCKET'
  }

  onmessage ( data, callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

  execute ( callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

}

module.exports = SocketRouteClass
