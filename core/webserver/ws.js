'use strict';

var Config = require( __dirname + '/../libs/configClass' );
var extendReq = require( __dirname + '/../libs/extendReq' );
var WebSocketServer = require( 'ws' ).Server;
var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadRoute = require( __dirname + '/../libs/loadRoute' );

module.exports = function ( config ) {

    config = new Config( config );

    return function ( server ) {

        var ws = new WebSocketServer( {
            server: server
        } );

        ws.on( 'connection', function ( socket ) {
            var req = socket.upgradeReq;

            extendReq( req, config.get() );

            var route = loadRoute( config.get( 'paths' ).routes, req.pathname, req );
            var renderer = new RendererClass( config.get( 'paths' ).renderers, route, req.headers.accept );

            var error = false;
            if ( !route ) {
                error = new ErrorClass( 404, config.get( 'errors' )[ '404' ] );
            } else {
                if ( !route.methodAllowed( 'SOCKET' ) ) {
                    error = new ErrorClass( 405, config.get( 'errors' )[ '405' ] );
                }
                if ( !route.protocolAllowed( req.protocol ) ) {
                    error = new ErrorClass( 403, config.get( 'errors' )[ '403' ] );
                }
            }
            if ( error ) {
                socket.send( renderer.render( error.getMessage() ) );
                socket.close();
                return;
            }

            socket.on( 'message', function ( message ) {
                req.body = message;
                route._getData( function ( data ) {
                    socket.send( renderer.render( data ) );
                }, function ( error ) {
                    socket.send( renderer.render( error.getMessage() ) );
                } );
            } );

            socket.on( 'close', function () {
                route.terminate();
            } );

        } );

    };

};
