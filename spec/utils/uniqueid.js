'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/uniqueid.js' );

describe( 'Apigeon: /core/utils/uniqueid.js', function () {

    it( 'should be a function', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        done();
    } );

    it( 'should return a unique numerical string', function ( done ) {
        var a = victim();
        var b = victim();
        expect( a ).to.match( /\d+/ );
        expect( b ).to.match( /\d+/ );
        expect( a ).to.not.equal( b );
        done();
    } );

} );
