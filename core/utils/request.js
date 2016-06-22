'use strict';

var request = require( 'request' );

module.exports = function ( config, data, callback, errorCallback ) {
    var settings = {
        url: config.url || '',
        method: config.method || 'GET',
        headers: config.headers || {}
    };
    request( {
        url: settings.url,
        method: settings.method,
        headers: settings.headers,
        formData: data
    }, function ( err, httpResponse, body ) {
        if ( err ) {
            return errorCallback( err );
        }
        callback( body );
    } );
};
