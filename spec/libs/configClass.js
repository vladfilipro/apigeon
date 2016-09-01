'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/configClass.js' );

describe( 'Apigeon: /core/libs/configClass.js', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( Victim ).to.be.a( 'function' );
        expect( Victim ).to.have.length( 1 );
        done();
    } );

    it( 'should be able to create a config instance with default configuration', function ( done ) {
        var o = new Victim();
        expect( o.get ).to.be.a( 'function' );
        expect( o.get() ).to.be.a( 'object' );
        done();
    } );

    it( 'should be able to create a config instance based on an object', function ( done ) {
        var o = new Victim( {
            paths: {
                routes: 'test'
            }
        } );
        expect( o.get( 'paths' ) ).to.be.a( 'object' );
        expect( o.get( 'paths' ).routes ).to.equal( 'test' );
        done();
    } );

    it( 'should be able to create a config instance based on another config instance', function ( done ) {
        var o1 = new Victim( {
            name: 'o1'
        } );
        expect( o1.get( 'name' ) ).to.equal( 'o1' );
        var o2 = new Victim( o1 );
        expect( o2.get( 'name' ) ).to.equal( 'o1' );
        done();
    } );
} );
