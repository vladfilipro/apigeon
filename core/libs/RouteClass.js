'use strict'

const ErrorClass = require( __dirname + '/ErrorClass' )

class RouteClass {

  constructor ( config, request, connection ) {
    this.config = config
    this.request = request
    this.connection = connection
  }

  setup ( done ) {
    done()
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

  execute ( data, callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  }

  terminate () {
    return true
  }

}

module.exports = RouteClass
