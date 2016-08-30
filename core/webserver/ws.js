'use strict';

var WebSocketServer = require( 'ws' ).Server;

var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadApi = require( __dirname + '/../libs/loadApi' );

module.exports = function ( config ) {

    return function ( server ) {

        var ws = new WebSocketServer( {
            server: server
        } );

        ws.on( 'connection', function ( socket ) {
            var req = socket.upgradeReq;

            var api = loadApi( config.paths.apis, req.pathname, req );
            var renderer = new RendererClass( config.paths.renderers, api );

            var error = false;
            if ( !api ) {
                error = new ErrorClass( 404, config.errors[ '404' ] );
            } else {
                if ( !api.methodAllowed( 'SOCKET' ) ) {
                    error = new ErrorClass( 405, config.errors[ '405' ] );
                }
                if ( !api.protocolAllowed( req.protocol ) ) {
                    error = new ErrorClass( 403, config.errors[ '403' ] );
                }
            }
            if ( error ) {
                socket.send( renderer.render( error.getMessage() ) );
                socket.close();
                return;
            }

            socket.on( 'message', function ( message ) {
                req.body = message;
                api._getData( function ( data ) {
                    socket.send( renderer.render( data ) );
                }, function ( error ) {
                    socket.send( renderer.render( error.getMessage() ) );
                } );
            } );

            socket.on( 'close', function () {
                api.terminate();
            } );

        } );

    };

};
