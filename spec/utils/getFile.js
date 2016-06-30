'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/getFile.js' );

describe( 'Apigeon: /core/utils/getFie.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should not use paths if not defined', function ( done ) {
        expect( victim( './env.js' ) ).to.equal( require( './../../core/utils/env.js' ) );
        done();
    } );

    it( 'should return false if file not found in paths array', function ( done ) {
        expect( victim( 'date.js', [ './../../' ] ) ).to.equal( false );
        done();
    } );

    it( 'should return the content of the first file found', function ( done ) {
        expect( victim( 'date.js', [ '/wrong-path', './../../core/utils/' ] ) ).to.equal( require( './../../core/utils/date.js' ) );
        done();
    } );

    it( 'should be aware of training slashes in paths', function ( done ) {
        expect( victim( 'date.js', [ '/wrong-path', './../../core/utils' ] ) ).to.equal( require( './../../core/utils/date.js' ) );
        done();
    } );

} );
