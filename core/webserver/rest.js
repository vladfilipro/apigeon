'use strict';

var Config = require( __dirname + '/../libs/configClass' );
var extendReq = require( __dirname + '/../libs/extendReq' );
var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadRoute = require( __dirname + '/../libs/loadRoute' );

module.exports = function ( config ) {

    config = new Config( config );

    return function ( server ) {

        server.on( 'request', function ( req, res ) {

            extendReq( req, config.get() );

            var route = loadRoute( config.get( 'paths' ).routes, req.pathname, req );
            var renderer = new RendererClass( config.get( 'paths' ).renderers, route, req.headers.accept );

            res.setHeader( 'Content-type', renderer.contentType );

            var error = false;
            if ( !route ) {
                error = new ErrorClass( 404, config.get( 'errors' )[ '404' ] );
            } else {
                if ( !route.methodAllowed( req.method ) ) {
                    error = new ErrorClass( 405, config.get( 'errors' )[ '405' ] );
                }
                if ( !route.protocolAllowed( req.protocol ) ) {
                    error = new ErrorClass( 403, config.get( 'errors' )[ '403' ] );
                }
            }
            if ( error ) {
                res.statusCode = error.getCode();
                res.end( renderer.render( error.getMessage() ) );
                return;
            }

            var proccessRequest = function ( data, code ) {
                res.statusCode = code;
                if ( code > 300 && code < 400 ) {
                    res.setHeader( 'Location', data );
                }
                res.end( renderer.render( data ) );
            };

            route._getData( function ( data, code ) {
                proccessRequest( data, code );
                route.terminate();
            }, function ( error ) {
                proccessRequest( error.getMessage(), error.getCode() );
                route.terminate();
            } );

        } );

    };

};
