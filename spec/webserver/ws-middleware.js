'use strict';

var expect = require( 'chai' ).expect;

var express = require( 'express' );
var http = require( 'http' );
var victim = require( './../../core/webserver/ws-middleware.js' );
var WebSocketClient = require( 'websocket' ).client;
var path = require( 'path' );
var apiPath = path.dirname( require.resolve( './fakeApis/dummy.js' ) );

describe( 'Apigeon: /core/webserver/ws-middleware.js', function () {

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

    it( 'should enable websockets on the express application', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim() );
        var instance = server.listen( '9999', function () {

            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                console.log( 'ce plm' );
                connection.on( 'error', function ( error ) {
                    console.log( 'Connect Error: ', error.toString() );
                    instance.close( done );
                } );
                connection.on( 'close', function ( error ) {
                    console.log( 'Connect Error: ', error.toString() );
                    instance.close( done );
                } );
                connection.on( 'message', function ( message ) {
                    console.log( 'Received: ', message );
                    instance.close( done );
                } );
            } );
            client.on( 'connectFailed', function ( error ) {
                console.log( 'Connect Error: ', error.toString() );
                instance.close( done );
            } );
            client.connect( 'ws://localhost:9999/' );

        } );
    } );

} );
