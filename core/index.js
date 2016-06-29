'use strict';

var utils = require( __dirname + '/utils' );

function Apigeon( app, server, paths ) {

    // Extend app with websocket potential
    require( 'express-ws' )( app, server );

    this.paths = utils.merge( {}, {
        apis: __dirname + '/../../../api',
        renderers: __dirname + '/../../../renderers',
        drivers: __dirname + '/../../../drivers'
    }, paths );

    return app;

}

Apigeon.prototype.session = function ( config ) {
    return require( __dirname + '/webserver/session-middleware' )( this.paths.drivers, config );
};
Apigeon.prototype.logs = function ( config ) {
    return require( __dirname + '/webserver/logs-middleware' )( this.paths.drivers, config );
};
Apigeon.prototype.rest = function () {
    return require( __dirname + '/webserver/rest-middleware' )( this.paths );
};
Apigeon.prototype.ws = function () {
    return require( __dirname + '/webserver/ws-middleware' )( this.paths );
};

module.exports = Apigeon;
