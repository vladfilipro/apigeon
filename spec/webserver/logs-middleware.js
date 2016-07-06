'use strict';

var expect = require( 'chai' ).expect;

var express = require( 'express' );
var victim = require( './../../core/webserver/logs-middleware.js' );
var request = require( 'supertest' );

describe( 'Apigeon: /core/webserver/logs-middleware.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should return a function with 3 parameters', function ( done ) {
        expect( victim() ).to.be.a( 'function' );
        expect( victim() ).to.have.length( 3 );
        done();
    } );

    it( 'should attach a logs instance to the request object when used', function ( done ) {
        var config = {
            table: 'logs',
            driver: 'memory'
        };
        var response = 'hello';
        var app = express();
        app.use( victim( null, config ) );
        app.get( '/', function ( req, res ) {
            expect( req.logs ).to.be.an.instanceof( require( './../../core/libs/logsClass' ) );
            res.end( response );
        } );
        var instance = app.listen( '9999', function () {
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
