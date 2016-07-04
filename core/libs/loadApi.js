'use strict';

var ErrorClass = require( __dirname + '/errorClass' );
var utils = require( __dirname + '/../utils' );

var schema = {
    defaultRenderer: function () {
        return 'application/json';
    },
    hasAccess: function () { // request
        return true;
    },
    methodAllowed: function () { // method
        return true;
    },
    protocolAllowed: function () { // protocol
        return true;
    },
    execute: function ( request, callback, errorCallback ) {
        errorCallback( new ErrorClass( 501 ) );
    },
    terminate: function () {
        return true;
    }
};

module.exports = function ( apisPath, pathname, request ) {

    var ApiClass = utils.getFile( pathname, [ apisPath, __dirname + '/../../api' ] );

    if ( !ApiClass ) {
        return false;
    }

    Object.keys( schema ).forEach( function ( prop ) {
        ApiClass.prototype[ prop ] = schema[ prop ];
    } );

    ApiClass.prototype.Error = ErrorClass;
    var instance = new ApiClass();
    instance.request = request;
    instance._getData = function ( callback, errorCallback ) {
        if ( !instance.hasAccess( request ) ) {
            errorCallback( new ErrorClass( 403 ) );
            return;
        }
        instance.execute( request, function ( data, code ) {
            callback( data, code || 200 );
        }, errorCallback );
    };
    return instance;

};
