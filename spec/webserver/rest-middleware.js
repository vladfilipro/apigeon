'use strict';

var expect = require( 'chai' ).expect;

var express = require( 'express' );
var victim = require( './../../core/webserver/rest-middleware.js' );
var request = require( 'supertest' );

describe( 'Apigeon: /core/webserver/rest-middleware.js', function () {

    it( 'should be a function with 1 parameter', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 1 );
        done();
    } );

    it( 'should return a function with 2 parameters', function ( done ) {
        expect( victim() ).to.be.a( 'function' );
        expect( victim() ).to.have.length( 2 );
        done();
    } );

} );
