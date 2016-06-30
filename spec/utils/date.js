'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/date.js' );

describe( 'Apigeon: /core/utils/date.js', function () {

    it( 'should be an object with 3 properties', function ( done ) {
        expect( victim ).to.have.property( 'now' );
        expect( victim ).to.have.property( 'datetime' );
        expect( victim ).to.have.property( 'json' );
        done();
    } );

    it( 'should have the `now` property be a function that returns valid data', function ( done ) {
        expect( victim.now() ).to.be.a( 'number' );
        done();
    } );

    it( 'should have the `datetime` property be a function that returns valid data 0000-00-00 00:00:00.000', function ( done ) {
        var regexp = new RegExp( '\\d{4}\\-\\d{2}\\-\\d{2}\\s\\d{2}\\:\\d{2}\\:\\d{2}\\.\\d{3}', 'gi' );
        expect( regexp.test( victim.datetime() ) ).to.equal( true );
        done();
    } );

    it( 'should have the `json` property be a function that returns valid data 0000-00-00T00:00:00.000Z', function ( done ) {
        var regexp = new RegExp( '\\d{4}\\-\\d{2}\\-\\d{2}T\\d{2}\\:\\d{2}\\:\\d{2}\\.\\d{3}Z', 'gi' );
        expect( regexp.test( victim.json() ) ).to.equal( true );
        done();
    } );

} );
