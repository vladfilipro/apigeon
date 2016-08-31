'use strict';

var Config = require( __dirname + '/libs/configClass' );
var http = require( 'http' );
var https = require( 'https' );

/**
 * Apigeon
 * @class
 * @desc Creates an new instance of <tt>Apigeon</tt>. Each instance is connected to a single http or https server.
 * @param options {Object} Configuration object
 */
function Apigeon( options ) {

    var config = new Config( options );

    var server = null;

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

    /**
     * start
     * @desc Starts the http / https server
     * @param port {Number} The port used by the http / https server
     * @param done {Function} Callback function, gets called once the server starts listening
     */
    this.start = function ( port, done ) {
        return server.listen( port, done );
    };

    /**
     * stop
     * @desc Stops the http / https server
     * @param done {Function} Callback function, gets called once the server stops
     */
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

    /**
     * getInstance
     * @desc Returns the server instance
     * @return {http.Server}
     */
    this.getInstance = function () {
        return server;
    };

    /**
     * getConfig
     * @desc Returns configuration instance of <tt>Apigeon</tt>
     * @return {Config}
     */
    this.getConfig = function () {
        return config;
    };

    /**
     * enableREST
     * @desc Enables REST features for the instance
     */
    this.enableREST = function () {
        require( __dirname + '/webserver/rest' )( config )( server );
    };

    /**
     * enableWS
     * @desc Enables WS features for the instance
     */
    this.enableWS = function () {
        require( __dirname + '/webserver/ws' )( config )( server );
    };

    /**
     * middlewares
     * @type {Object}
     * @namespace
     * @desc Contains a list of all available middlewares
     */
    this.middlewares = {
        /**
         * Returns a middleware to manipulate session
         * @type {Function}
         * @param {Object} sessionConfig Session middleware configuration object
         * @returns {Function}
         */
        session: function ( sessionConfig ) {
            return require( __dirname + '/webserver/session' )( config, sessionConfig );
        },
        /**
         * Returns a middleware to manipulate logs
         * @type {Function}
         * @param {Object} logsConfig Logs middleware configuration object
         * @returns {Function}
         */
        logs: function ( logsConfig ) {
            return require( __dirname + '/webserver/logs' )( config, logsConfig );
        }
    };

}

module.exports = Apigeon;
