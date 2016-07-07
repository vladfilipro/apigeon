'use strict';

var url = require( 'url' );

var ErrorClass = require( __dirname + '/../libs/errorClass' );
var RendererClass = require( __dirname + '/../libs/rendererClass' );
var loadApi = require( __dirname + '/../libs/loadApi' );

module.exports = function ( paths ) {

    paths = paths || {};

    return function ( req, res ) {

        var urlParts = url.parse( req.url, true );

        var api = loadApi( paths.apis || '', urlParts.pathname, req );

        var renderer = new RendererClass( paths.renderers || '', api, req.get( 'Accept' ) );

        res.header( 'Content-type', renderer.contentType );

        var error = false;
        if ( !api ) {
            error = new ErrorClass( 404 );
        } else {
            if ( !api.methodAllowed( req.method ) ) {
                error = new ErrorClass( 405 );
            }
            if ( !api.protocolAllowed( req.protocol ) ) {
                error = new ErrorClass( 403 );
            }
        }
        if ( error ) {
            res.status( error.getCode() );
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

    };
};
