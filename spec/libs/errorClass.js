'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/errorClass.js' );

describe( 'Apigeon: /core/libs/errorClass.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( Victim ).to.be.a( 'function' );
        expect( Victim ).to.have.length( 2 );
        done();
    } );

    it( 'should contain a method getCode() which returns the code provided in the constructor', function ( done ) {
        var e = new Victim( 404 );
        expect( e.getCode() ).to.equal( 404 );
        done();
    } );

    it( 'should contain a method getMessage() which returns the message associate with the code (provided in the constructor)', function ( done ) {
        var e = new Victim( 100, 'test' );
        expect( e.getCode() ).to.equal( 100 );
        var message = JSON.parse( e.getMessage() );
        expect( message ).to.have.a.property( 'error' );
        expect( message.error ).to.have.any.keys( 'code', 100 );
        expect( message.error ).to.have.any.keys( 'message', 'test' );
        done();
    } );

    it( 'should output the appropriate message for each code.', function ( done ) {
        var e;
        e = new Victim( 403 );
        expect( JSON.parse( e.getMessage() ).error ).to.have.any.keys( 'message', 'Access denied.' );
        e = new Victim( 404 );
        expect( JSON.parse( e.getMessage() ).error ).to.have.any.keys( 'message', 'Page not found.' );
        e = new Victim( 405 );
        expect( JSON.parse( e.getMessage() ).error ).to.have.any.keys( 'message', 'Method not allowed.' );
        e = new Victim( 500 );
        expect( JSON.parse( e.getMessage() ).error ).to.have.any.keys( 'message', 'There was an error.' );
        e = new Victim( 501 );
        expect( JSON.parse( e.getMessage() ).error ).to.have.any.keys( 'message', 'Not Implemented.' );
        done();
    } );

} );
