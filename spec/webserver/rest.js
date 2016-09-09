'use strict';

var expect = require( 'chai' ).expect;
var http = require( 'http' );
var victim = require( './../../core/webserver/rest.js' );
var request = require( 'supertest' );
var path = require( 'path' );
var routesPath = path.dirname( require.resolve( './fakeRoutes/dummy.js' ) );

describe( 'Apigeon: /core/webserver/rest.js', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 1 );
        done();
    } );

    it( 'should return a function with 1 parameters', function ( done ) {
        var plugin = victim();
        expect( plugin ).to.be.a( 'function' );
        expect( plugin ).to.have.length( 1 );
        done();
    } );

    it( 'should start a simple rest server which accepts GET methods', function ( done ) {
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/' )
                .expect( 404 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 404 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should start a simple rest server which accepts POST methods', function ( done ) {
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .post( '/' )
                .expect( 404 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 404 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should start a simple rest server which accepts PUT methods', function ( done ) {
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .put( '/' )
                .expect( 404 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 404 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should start a simple rest server which accepts DELETE methods', function ( done ) {
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .delete( '/' )
                .expect( 404 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 404 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should output result of route', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/dummy?bad=true' )
                .expect( 500 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 500 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should call route terminate at the end of execute, on success', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/dummy' )
                .expect( 200 )
                .end( function ( err ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( global[ 'terminated_route' ] ).to.equal( true );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should call route terminate at the end of execute, on error', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/dummy?bad=true' )
                .expect( 500 )
                .end( function ( err ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( global[ 'terminated_route' ] ).to.equal( true );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should be able to use server redirects', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/redirect' )
                .expect( 301 )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.headers.location ).to.equal( 'http://fake.com' );
                    expect( res.statusCode ).to.equal( 301 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should respect routes methodAllowed returns', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .post( '/noaccess-method' )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.statusCode ).to.equal( 405 );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should respect routes protocolAllowed returns', function ( done ) {
        var server = http.createServer();
        var plugin = victim( {
            paths: {
                routes: routesPath
            }
        } );
        server.on( 'request', function ( req ) {
            req.protocol = ( req.socket.encrypted ) ? ( req.headers[ 'X-Forwarded-Proto' ] ? 'https' : 'http' ) : 'http';
        } );
        plugin( server );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/noaccess-protocol' )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.text ).to.equal( '{"error":{"code":403,"message":"Access denied."}}' );
                    expect( res.statusCode ).to.equal( 403 );
                    instance.close( done );
                } );
        } );
    } );

} );
