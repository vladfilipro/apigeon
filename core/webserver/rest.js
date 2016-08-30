'use strict';

var url = require( 'url' );
var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadApi = require( __dirname + '/../libs/loadApi' );

var loadConfig = function ( config ) {
    config = config || {};
    config.paths = config.paths || {};
    config.errors = config.errors || {};
    return config;
};

module.exports = function ( config ) {

    config = loadConfig( config );

    return function ( server ) {

        server.on( 'request', function ( req, res ) {

            req.pathname = req.pathname || url.parse( req.url, true ).pathname;

            var api = loadApi( config.paths.apis, req.pathname, req );
            var renderer = new RendererClass( config.paths.renderers, api );

            res.setHeader( 'Content-type', renderer.contentType );

            var error = false;
            if ( !api ) {
                error = new ErrorClass( 404, config.errors[ '404' ] );
            } else {
                if ( !api.methodAllowed( req.method ) ) {
                    error = new ErrorClass( 405, config.errors[ '405' ] );
                }
                if ( !api.protocolAllowed( req.protocol ) ) {
                    error = new ErrorClass( 403, config.errors[ '403' ] );
                }
            }
            if ( error ) {
                res.writeHead( error.getCode() );
                res.end( renderer.render( error.getMessage() ) );
                return;
            }

            var proccessRequest = function ( data, code ) {
                res.status( code );
                if ( code > 300 && code < 400 ) {
                    res.redirect( data );
                }
                res.end( renderer.render( data ) );
            };

            api._getData( function ( data, code ) {
                proccessRequest( data, code );
                api.terminate();
            }, function ( error ) {
                proccessRequest( error.getMessage(), error.getCode() );
                api.terminate();
            } );

        } );

    };

};
