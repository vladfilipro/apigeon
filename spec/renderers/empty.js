'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/renderers/empty.js' );

describe( 'Apigeon: /core/renderers/empty.js', function () {

    it( 'should be a function with 0 parameter', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 0 );
        done();
    } );

    it( 'should return an empty string', function ( done ) {
        expect( victim() ).to.equal( '' );
        done();
    } );

} );
