'use strict';

function Apigeon( app, server ) {

    // Extend app with websocket potential
    require( 'express-ws' )( app, server );

    var config = {
        paths: {
            api: './api',
            renderers: './renderers',
            drivers: './drivers'
        }
    };

    return app;

}

Apigeon.prototype.session = function ( config ) {
    return require( __dirname + '/webserver/session-middleware' )( config );
};
Apigeon.prototype.logs = function ( config ) {
    return require( __dirname + '/webserver/logs-middleware' )( config );
};
Apigeon.prototype.rest = function () {
    return require( __dirname + '/webserver/rest-middleware' )();
};
Apigeon.prototype.ws = function () {
    return require( __dirname + '/webserver/ws-middleware' )();
};

module.exports = Apigeon;
