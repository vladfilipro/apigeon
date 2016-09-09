'use strict';

var Config = require( __dirname + '/../libs/configClass' );
var extendReq = require( __dirname + '/../libs/extendReq' );
var ErrorClass = require( __dirname + '/../libs/errorClass' );
var loadRoute = require( __dirname + '/../libs/loadRoute' );

module.exports = function ( config ) {

    config = new Config( config );

    return function ( server ) {

        server.on( 'request', function ( req, res ) {

            extendReq( req, config.get() );

            var route = loadRoute( config.get( 'paths' ).routes, req.pathname, req );

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
                res.end( error.getMessage() );
                return;
            }

            var proccessRequest = function ( data, code, headers ) {
                res.statusCode = code;
                if ( headers && typeof headers === 'object' ) {
                    var headerNames = Object.keys( headers );
                    for ( var i = 0, l = headerNames.length; i < l; i++ ) {
                        res.setHeader( headerNames[ i ], headers[ headerNames[ i ] ] );
                    }
                }
                res.end( data );
            };

            route._getData( function ( data, code, headers ) {
                proccessRequest( data, code, headers );
                route.terminate();
            }, function ( error ) {
                proccessRequest( error.getMessage(), error.getCode() );
                route.terminate();
            } );

        } );

    };

};
