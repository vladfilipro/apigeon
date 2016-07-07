'use strict';

var url = require( 'url' );

var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadApi = require( __dirname + '/../libs/loadApi' );

module.exports = function ( paths ) {

    paths = paths || {};

    return function ( socket, req ) {

        var urlParts = url.parse( req.url.replace( /\.websocket$/, '' ), true );

        var api = loadApi( paths.apis, urlParts.pathname, req );
        var renderer = new RendererClass( paths.renderers, api );

        var error = false;
        if ( !api ) {
            error = new ErrorClass( 404 );
        } else {
            if ( !api.methodAllowed( 'SOCKET' ) ) {
                error = new ErrorClass( 405 );
            }
            if ( !api.protocolAllowed( req.protocol ) ) {
                error = new ErrorClass( 403 );
            }
        }
        if ( error ) {
            req.reject( error.getCode(), renderer.render( error.getMessage() ) );
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

    };
};
