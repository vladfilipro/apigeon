'use strict';

var Config = require( __dirname + '/libs/configClass' );
var extendReq = require( __dirname + '/libs/extendReq' );
var http = require( 'http' );
var https = require( 'https' );

function Apigeon( options ) {

    var config = new Config( options );

    var server = null;
    var middlewares = [];

    if ( !config.get( 'httpsOptions' ) ) {
        server = http.createServer();
    } else {
        server = https.createServer( config.get( 'httpsOptions' ) );
    }

    // Register all connections
    var connections = {};
    server.on( 'connection', function ( socket ) {
        var id = ( new Date() ).getTime() + '' + Math.floor( Math.random() * 10000000 ); // Unique Id
        connections[ id ] = socket;
        socket.on( 'close', function () {
            delete connections[ id ];
        } );
    } );

    var executeMiddlewares = function( req, res, cb ) {

        // extend request
        extendReq( req, config.get() );

        // run middlewares
        var executeMiddleware = function ( i ) {
            i = i || 0;
            if ( middlewares.length > i ) {
                middlewares[ i ]( req, res, function () {
                    executeMiddleware( i + 1 );
                } );
            } else {
                cb();
            }
        };
        executeMiddleware();

    };

    this.start = function ( port, done ) {
        return server.listen( port, done );
    };

    this.stop = function ( done ) {
        if ( server.listening ) {
            for ( var i = 0, keys = Object.keys( connections ), l = keys.length; i < l; i++ ) {
                connections[ keys[ i ] ].destroy();
            }
            server.close( done );
        } else {
            done();
        }
    };

    this.getInstance = function () {
        return server;
    };

    this.getConfig = function () {
        return config;
    };

    this.enableREST = function () {
        require( __dirname + '/webserver/rest' )( config )( server, executeMiddlewares );
    };

    this.enableWS = function () {
        require( __dirname + '/webserver/ws' )( config )( server, executeMiddlewares );
    };

    this.attach = function ( middleware ) {
        if ( typeof middleware === 'function' ) {
            middlewares.push( middleware );
        }
    };

    var predefinedMiddlewares = {
        session: function ( sessionConfig ) {
            return require( __dirname + '/webserver/middlewares/session' )( config, sessionConfig );
        },
        logs: function ( logsConfig ) {
            return require( __dirname + '/webserver/middlewares/logs' )( config, logsConfig );
        }
    };

    this.middlewares = predefinedMiddlewares;
}

module.exports = Apigeon;
