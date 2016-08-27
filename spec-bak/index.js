'use strict';

var expect = require( 'chai' ).expect;

var Apigeon = require( './../core/index.js' );
var express = require( 'express' );
var http = require( 'http' );

describe( 'Apigeon: core', function () {

    var app = express();
    var server = http.createServer( app );

    // Tests
    it( 'should be a function with 3 parameters', function ( done ) {
        expect( Apigeon ).to.be.a( 'function' );
        expect( Apigeon ).to.have.length( 3 );
        done();
    } );

    it( 'should allow null and undefined config', function ( done ) {
        var apigeon = new Apigeon( app, server, {} );
        var defaultPaths = apigeon.paths;
        expect( defaultPaths ).to.have.property( 'apis' );
        expect( defaultPaths ).to.have.property( 'renderers' );
        expect( defaultPaths ).to.have.property( 'drivers' );

        var apigeon1 = new Apigeon( app, server );
        expect( apigeon1.paths.apis ).to.equal( defaultPaths.apis );
        expect( apigeon1.paths.renderers ).to.equal( defaultPaths.renderers );
        expect( apigeon1.paths.drivers ).to.equal( defaultPaths.drivers );
        var apigeon2 = new Apigeon( app, server, null );
        expect( apigeon2.paths.apis ).to.equal( defaultPaths.apis );
        expect( apigeon2.paths.renderers ).to.equal( defaultPaths.renderers );
        expect( apigeon2.paths.drivers ).to.equal( defaultPaths.drivers );

        done();
    } );

    it( 'should extend the paths with the new ones provided', function ( done ) {
        var apigeon1 = new Apigeon( app, server );
        var defaultPaths = apigeon1.paths;
        var apigeon2 = new Apigeon( app, server, {
            apis: './api',
            drivers: './drivers'
        } );
        expect( apigeon2.paths.apis ).to.equal( './api' );
        expect( apigeon2.paths.renderers ).to.equal( defaultPaths.renderers );
        expect( apigeon2.paths.drivers ).to.equal( './drivers' );
        done();
    } );

    it( 'should have Session middleware prototype', function ( done ) {
        var apigeon = new Apigeon( app, server );
        expect( apigeon.session ).to.be.a( 'function' );
        expect( apigeon.session ).to.have.length( 1 );
        var middleware = apigeon.session( {
            driver: 'filesystem',
            table: 'session'
        } );
        expect( middleware ).to.be.a( 'function' );
        expect( middleware ).to.have.length( 3 );
        done();
    } );

    it( 'should have Logs middleware prototype', function ( done ) {
        var apigeon = new Apigeon( app, server );
        expect( apigeon.logs ).to.be.a( 'function' );
        expect( apigeon.logs ).to.have.length( 1 );
        var middleware = apigeon.logs( {
            driver: 'filesystem',
            table: 'logs'
        } );
        expect( middleware ).to.be.a( 'function' );
        expect( middleware ).to.have.length( 3 );
        done();
    } );

    it( 'should have REST middleware prototype', function ( done ) {
        var apigeon = new Apigeon( app, server );
        expect( apigeon.rest ).to.be.a( 'function' );
        expect( apigeon.rest ).to.have.length( 0 );
        var middleware = apigeon.rest();
        expect( middleware ).to.be.a( 'function' );
        expect( middleware ).to.have.length( 2 );
        done();
    } );

    it( 'should have WEBSOCKET middleware prototype', function ( done ) {
        var apigeon = new Apigeon( app, server );
        expect( apigeon.ws ).to.be.a( 'function' );
        expect( apigeon.ws ).to.have.length( 0 );
        var middleware = apigeon.ws( {
            driver: 'filesystem',
            table: 'session'
        } );
        expect( middleware ).to.be.a( 'function' );
        expect( middleware ).to.have.length( 2 );
        done();
    } );

} );
