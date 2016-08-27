'use strict';

var utils = require( __dirname + '/utils' );
var http = require( 'http' );
var https = require( 'https' );

function Apigeon( options ) {

    var config = utils.merge( {}, {
        paths: {
            apis: null,
            drivers: null,
            renderers: null
        },
        errors: {},
        rewrite: function ( url ) {
            return url;
        },
        httpsOptions: null
    }, options );

    var server = null;

    if ( !config.httpsOptions ) {
        server = http.createServer();
    } else {
        server = https.createServer( config.httpsOptions );
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

    var startServer = function ( port, done ) {
        server.listen( port, done );
    };

    var stopServer = function ( done ) {
        if ( server.listening ) {
            for ( var i in connections ) {
                if ( connections.hasOwnProperty( i ) ) {
                    connections[ i ].destroy();
                }
            }
            server.close( done );
        } else {
            done();
        }
    };

    this.attach = function ( serverType ) {
        if ( typeof serverType === 'function' ) {
            serverType( server );
        }
    };

    this.start = startServer;
    this.stop = stopServer;

    Apigeon.prototype.REST = function () {
        return require( __dirname + '/webserver/rest' )( config );
    };
    Apigeon.prototype.WS = function () {
        return require( __dirname + '/webserver/ws' )( config );
    };
    Apigeon.prototype.session = function ( sessionConfig ) {
        return require( __dirname + '/webserver/session' )( config, sessionConfig );
    };
    Apigeon.prototype.logs = function ( logsConfig ) {
        return require( __dirname + '/webserver/logs' )( config, logsConfig );
    };

}

module.exports = Apigeon;
