'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )

class RouteClass {

  constructor ( config, request, connection ) {
    this.config = config
    this.request = request
    this.connection = connection
  }

  hasAccess () {
    return true
  }

  methodAllowed ( method ) {
    return true
  }

  protocolAllowed ( protocol ) {
    return true
  }

  execute ( callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

  terminate () {
    return true
  }

}

module.exports = RouteClass
