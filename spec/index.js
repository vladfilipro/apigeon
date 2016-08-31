'use strict';

var expect = require( 'chai' ).expect;
var request = require( 'supertest' );

var Apigeon = require( './../core/index.js' );

describe( 'Apigeon: core', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( Apigeon ).to.be.a( 'function' );
        expect( Apigeon ).to.have.length( 1 );
        done();
    } );

    it( 'should allow null and undefined config', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.start( 8000, function () {
            apigeon.stop( done );
        } );
    } );

    it( 'should have a getConfig method to read the configuration', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.getConfig ).to.be.a( 'function' );
        expect( typeof apigeon.getConfig() ).to.equal( 'object' );
        done();
    } );

    it( 'should have a getInstance method to get the server instance', function ( done ) {
        var http = require( 'http' );
        var apigeon = new Apigeon();
        expect( apigeon.getInstance ).to.be.a( 'function' );
        expect( apigeon.getInstance() ).to.be.instanceof( http.Server );
        done();
    } );

    it( 'should have rewrite function in config object', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.getConfig().get( 'rewrite' ) ).to.be.a( 'function' );
        expect( apigeon.getConfig().get( 'rewrite' ) ).to.have.length( 1 );
        expect( apigeon.getConfig().get( 'rewrite' )( 'test' ) ).to.equal( 'test' );
        done();
    } );

    it( 'should provide REST plugin', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.REST() ).to.be.a( 'function' );
        expect( apigeon.REST() ).to.have.length( 1 );
        done();
    } );

    it( 'should provide WS plugin', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.WS() ).to.be.a( 'function' );
        expect( apigeon.WS() ).to.have.length( 1 );
        done();
    } );

    it( 'should provide session plugin', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.session() ).to.be.a( 'function' );
        expect( apigeon.session() ).to.have.length( 1 );
        done();
    } );

    it( 'should provide logs plugin', function ( done ) {
        var apigeon = new Apigeon();
        expect( apigeon.logs() ).to.be.a( 'function' );
        expect( apigeon.logs() ).to.have.length( 1 );
        done();
    } );

    it( 'should not fail if attempting to stop an instance that was not started', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.stop( done );
    } );

    it( 'should not fail when attaching an invalid function', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.attach();
        apigeon.start( 8000, function () {
            apigeon.stop( done );
        } );
    } );

    it( 'should be able to start an http server', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.attach( function ( server ) {
            server.on( 'request', function ( req, res ) {
                res.end( 'Hello' );
            } );
        } );
        var instance = apigeon.start( 8000, function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( e, res ) {
                    expect( res.text ).to.equal( 'Hello' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should be able to start an https server', function ( done ) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        var fs = require( 'fs' );
        var apigeon = new Apigeon( {
            httpsOptions: {
                key: fs.readFileSync( __dirname + '/cert/key.pem' ),
                cert: fs.readFileSync( __dirname + '/cert/cert.pem' )
            }
        } );
        apigeon.attach( function ( server ) {
            server.on( 'request', function ( req, res ) {
                res.end( 'Hello' );
            } );
        } );
        var instance = apigeon.start( 8000, function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( e, res ) {
                    expect( res.text ).to.equal( 'Hello' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should have a method to stop the running server', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.start( 8000, function () {
            apigeon.stop( done );
        } );
    } );

    it( 'should kill all connections on server stop', function ( done ) {
        var apigeon = new Apigeon();
        apigeon.attach( function ( server ) {
            var i = 0;
            server.on( 'request', function ( req, res ) {

                // Keeping a long connection to test termination of socket (will last 1.5 seconds)
                var intervalId = setInterval( function () {
                    res.write( '.' );
                    i++;
                    if ( i === 10 ) {
                        clearInterval( intervalId );
                    }
                }, 10 );
            } );
        } );
        var instance = apigeon.start( 8000, function () {
            request( instance )
                .get( '/' )
                .end( function ( e, res ) {
                    console.log( res.text );
                } );

            // Closing the server 1 second after it started
            setTimeout( function () {
                apigeon.stop( function () {
                    done();
                } );
            }, 1000 );
        } );
    } );

} );
