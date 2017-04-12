'use strict'

var ErrorClass = require( __dirname + '/errorClass' )
var utils = require( __dirname + '/../utils' )

var schema = {
  hasAccess: function () { // request
    return true
  },
  methodAllowed: function () { // method
    return true
  },
  protocolAllowed: function () { // protocol
    return true
  },
  execute: function ( request, callback, errorCallback ) {
    errorCallback( new ErrorClass( 501 ) )
  },
  terminate: function () {
    return true
  }
}

module.exports = function ( routesPath, pathname, request ) {
  var RouteClass = utils.getFile( pathname, [ routesPath, __dirname + '/../../routes' ] )

  if ( !RouteClass ) {
    return false
  }

  Object.keys( schema ).forEach( function ( prop ) {
    RouteClass.prototype[ prop ] = schema[ prop ]
  } )

  RouteClass.prototype.Error = ErrorClass
  var instance = new RouteClass()
  instance.request = request
  instance._getData = function ( callback, errorCallback ) {
    if ( !instance.hasAccess( request ) ) {
      errorCallback( new ErrorClass( 403 ) )
      return
    }
    instance.execute( request, function ( data, code, headers ) {
      callback( data, code || 200, headers )
    }, errorCallback )
  }
  return instance
}
