'use strict'

const utils = require( __dirname + '/../utils' )

const ErrorClass = require( __dirname + '/ErrorClass' )

class RouteClass {

  constructor ( config, request ) {
    this.config = config
    this.request = request
    this.createError = ( code, message ) => {
      message = message || ( utils.isObject( this.config.get( 'httpErrors' ) ) ? this.config.get( 'httpErrors' )[ code ] : null )
      return new ErrorClass( code, message )
    }
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
    errorCallback( this.createError( 501 ) )
  }

  terminate () {
    return true
  }

}

module.exports = RouteClass
