'use strict';

var ErrorClass = require( __dirname + '/errorClass' );

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

module.exports = function ( pathname ) {

    try {
        var ApiClass = require( __dirname + '/../../api' + pathname );
        for ( var prop in schema ) {
            if ( schema.hasOwnProperty( prop ) ) {
                ApiClass.prototype[ prop ] = schema[ prop ];
            }
        }
        var instance = new ApiClass();
        instance._getData = function ( request, callback, errorCallback ) {
            if ( !instance.hasAccess( request ) ) {
                errorCallback( new ErrorClass( 403 ) );
                return;
            }
            instance.execute( request, function ( data, code ) {
                callback( data, code || 200 );
            }, errorCallback );
        };
        return instance;
    } catch ( e ) {
        return false;
    }

};
