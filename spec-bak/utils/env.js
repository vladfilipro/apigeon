'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/env.js' );

describe( 'Apigeon: /core/utils/env.js', function () {

    var savedEnv;

    beforeEach( function ( done ) {
        savedEnv = process.env.NODE_ENV;
        done();
    } );

    afterEach( function ( done ) {
        process.env.NODE_ENV = savedEnv;
        done();
    } );

    it( 'should be an object with 3 properties', function ( done ) {
        expect( victim ).to.have.property( 'isDevelopment' );
        expect( victim ).to.have.property( 'isProduction' );
        expect( victim ).to.have.property( 'get' );
        done();
    } );

    it( 'should have a property called `isDevelopment` which returns a boolean value', function ( done ) {
        expect( victim.isDevelopment() ).to.equal( true );
        process.env.NODE_ENV = 'development';
        expect( victim.isDevelopment() ).to.equal( true );
        done();
    } );

    it( 'should have a property called `isProduction` which returns a boolean value', function ( done ) {
        expect( victim.isProduction() ).to.equal( false );
        process.env.NODE_ENV = 'production';
        expect( victim.isProduction() ).to.equal( true );
        process.env.NODE_ENV = 'prod';
        expect( victim.isProduction() ).to.equal( true );
        done();
    } );

    it( 'should have a property called `get` which returns the selected environment', function ( done ) {
        expect( victim.get() ).to.equal( 'development' );
        process.env.NODE_ENV = 'production';
        expect( victim.get() ).to.equal( 'production' );
        done();
    } );

} );
