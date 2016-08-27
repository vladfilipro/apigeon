'use strict';

var expect = require( 'chai' ).expect;

var Apigeon = require( './../core/index.js' );

describe( 'Apigeon: core', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( Apigeon ).to.be.a( 'function' );
        expect( Apigeon ).to.have.length( 1 );
        done();
    } );

    it( 'should allow null and undefined config', function ( done ) {

        //var apigeon = new Apigeon();

        done();
    } );

} );
