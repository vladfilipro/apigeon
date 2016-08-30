'use strict';

var expect = require( 'chai' ).expect;
var http = require( 'http' );
var victim = require( './../../core/webserver/logs.js' );
var request = require( 'supertest' );

describe( 'Apigeon: /core/webserver/logs.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should return a function with 1 parameters', function ( done ) {
        var plugin = victim();
        expect( plugin ).to.be.a( 'function' );
        expect( plugin ).to.have.length( 1 );
        done();
    } );

    it( 'should attach a logs instance to the request object when used', function ( done ) {
        var response = 'hello';
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        server.on( 'request', function ( req, res ) {
            expect( req.logs ).to.be.an.instanceof( require( './../../core/libs/logsClass' ) );
            res.end( response );
        } );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( err, res ) {
                    expect( err ).to.equal( null );
                    expect( res.text ).to.equal( response );
                    instance.close( done );
                } );
        } );
    } );

} );
