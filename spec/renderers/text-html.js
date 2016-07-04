'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/renderers/text-html.js' );

describe( 'Apigeon: /core/renderers/text-html.js', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 1 );
        done();
    } );

    it( 'should return a string', function ( done ) {
        expect( victim( 'untouched text' ) ).to.equal( 'untouched text' );
        expect( victim( {} ) ).to.equal( '' );
        expect( victim( undefined ) ).to.equal( '' );
        done();
    } );

} );