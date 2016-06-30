'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/renderers/application-json.js' );

describe( 'Apigeon: /core/renderers/application-json.js', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 1 );
        done();
    } );

    it( 'should return a json', function ( done ) {
        expect( victim( {} ) ).to.equal( '{}' );
        expect( victim( 'invalid object' ) ).to.equal( 'invalid object' );
        expect( victim( undefined ) ).to.equal( undefined );
        var o = {
            a: 'foo',
            b: 'bar'
        };
        expect( victim( o ) ).to.equal( JSON.stringify( o ) );
        done();
    } );

} );
