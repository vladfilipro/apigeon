'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/log.js' );

describe( 'Apigeon: /core/utils/log.js', function () {

    it( 'should be a function', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        done();
    } );

    it( 'should send arguments to console.log', function ( done ) {
        var oldConsoleLog = console.log;
        var result;
        console.log = function () {
            result = arguments;

            // let test errors go through
            if ( !( result[ '0' ] === '1' && result[ '1' ] === '2' && result[ '2' ] === 3 ) ) {
                oldConsoleLog.apply( this, arguments );
            }
        };
        victim( '1', '2', 3 );
        expect( typeof result ).to.equal( 'object' );
        expect( result ).to.have.property( '0', '1' );
        expect( result ).to.have.property( '1', '2' );
        expect( result ).to.have.property( '2', 3 );
        console.log = oldConsoleLog;
        done();
    } );

} );
