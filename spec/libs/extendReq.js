'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/libs/extendReq.js' );

describe( 'Apigeon: /core/libs/extendReq.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should attach pathname from url', function ( done ) {
        var req = {
            url: 'http://www.test.com/info?param=true',
            headers: {},
            socket: {
                encrypted: false
            }
        };
        victim( req );
        expect( req.pathname ).to.equal( '/info' );
        done();
    } );

    it( 'should attach query from url', function ( done ) {
        var req = {
            url: 'http://www.test.com/info?param1=true&param2=false',
            headers: {},
            socket: {
                encrypted: false
            }
        };
        victim( req );
        expect( req.query ).to.eql( {
            param1: 'true',
            param2: 'false'
        } );
        done();
    } );

    it( 'should attach protocol from url - based on socket encryption', function ( done ) {
        var req = {
            url: 'https://www.test.com/info?param1=true&param2=false',
            headers: {},
            socket: {
                encrypted: true
            }
        };
        victim( req );
        expect( req.protocol ).to.equal( 'https' );
        done();
    } );

    it( 'should attach protocol from url - based on proxy header', function ( done ) {
        var req = {
            url: 'https://www.test.com/info?param1=true&param2=false',
            headers: {
                'X-Forwarded-Proto': 'https'
            },
            socket: {
                encrypted: false
            }
        };
        victim( req );
        expect( req.protocol ).to.equal( 'https' );
        done();
    } );

} );
