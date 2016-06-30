'use strict';

var utils = require( __dirname + '/utils' );

function Apigeon( app, server, paths ) {

    // Extend app with websocket potential
    require( 'express-ws' )( app, server );

    this.paths = utils.merge( {}, {
        apis: __dirname + '/../../../api',
        renderers: null,
        drivers: null
    }, paths );

}

Apigeon.prototype.session = function ( config ) {
    var drivers = this.paths.drivers;
    return require( __dirname + '/webserver/session-middleware' )( drivers, config );
};
Apigeon.prototype.logs = function ( config ) {
    var drivers = this.paths.drivers;
    return require( __dirname + '/webserver/logs-middleware' )( drivers, config );
};
Apigeon.prototype.rest = function () {
    return require( __dirname + '/webserver/rest-middleware' )( this.paths );
};
Apigeon.prototype.ws = function () {
    return require( __dirname + '/webserver/ws-middleware' )( this.paths );
};

module.exports = Apigeon;
