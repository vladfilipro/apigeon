'use strict';

var expect = require( 'chai' ).expect;

var express = require( 'express' );
var http = require( 'http' );
var victim = require( './../../core/webserver/ws-middleware.js' );
var WebSocketClient = require( 'websocket' ).client;
var path = require( 'path' );
var apiPath = path.dirname( require.resolve( './fakeApis/dummy.js' ) );
var ErrorClass = require( './../../core/libs/errorClass' );

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
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                connection.on( 'message', function ( message ) {
                    var error = new ErrorClass( 404 );
                    expect( message.utf8Data ).to.equal( JSON.stringify( error.getMessage() ) );
                } );
            } );
            client.connect( 'ws://localhost:9999/' );
        } );
    } );

    it( 'should use the methodAllowed return to resolve the response', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim( {
            apis: apiPath
        } ) );
        var instance = server.listen( '9999', function () {
            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                connection.on( 'message', function ( message ) {
                    var error = new ErrorClass( 405 );
                    expect( message.utf8Data ).to.equal( JSON.stringify( error.getMessage() ) );
                } );
            } );
            client.connect( 'ws://localhost:9999/noaccess-method' );
        } );
    } );

    it( 'should use the protocolAllowed return to resolve the response', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim( {
            apis: apiPath
        } ) );
        var instance = server.listen( '9999', function () {
            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                connection.on( 'message', function ( message ) {
                    var error = new ErrorClass( 403 );
                    expect( message.utf8Data ).to.equal( JSON.stringify( error.getMessage() ) );
                } );
            } );
            client.connect( 'ws://localhost:9999/noaccess-protocol' );
        } );
    } );

    it( 'should return a message from api (can be used multiple times)', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim( {
            apis: apiPath
        } ) );
        var instance = server.listen( '9999', function () {
            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                connection.sendUTF( 'ping' );
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                var count = 0;
                connection.on( 'message', function ( message ) {
                    expect( message.utf8Data ).to.equal( 'Hello' );
                    count++;
                    if ( count === 3 ) {
                        connection.close( function () {
                            instance.close( done );
                        } );
                    } else {
                        connection.sendUTF( 'ping' + count );
                    }
                } );
            } );
            client.connect( 'ws://localhost:9999/dummy' );
        } );
    } );

    it( 'should return an error message from api (can be used multiple times)', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim( {
            apis: apiPath
        } ) );
        var instance = server.listen( '9999', function () {
            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                connection.sendUTF( 'bad' );
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                var count = 0;
                connection.on( 'message', function ( message ) {
                    var error = new ErrorClass( 500 );
                    expect( message.utf8Data ).to.equal( JSON.stringify( error.getMessage() ) );
                    count++;
                    if ( count === 3 ) {
                        connection.close( function () {
                            instance.close( done );
                        } );
                    } else {
                        connection.sendUTF( 'bad' );
                    }
                } );
            } );
            client.connect( 'ws://localhost:9999/dummy' );
        } );
    } );

    it( 'should call api terminate at the end of socket', function ( done ) {
        var app = express();
        var server = http.createServer( app );
        require( 'express-ws' )( app, server );
        app.ws( '*', victim( {
            apis: apiPath
        } ) );
        var instance = server.listen( '9999', function () {
            var client = new WebSocketClient();
            client.on( 'connect', function ( connection ) {
                connection.sendUTF( 'Hi' );
                connection.on( 'close', function () {
                    instance.close( done );
                } );
                connection.on( 'message', function ( message ) {
                    expect( message.utf8Data ).to.equal( 'Hello' );
                    connection.close( function () {
                        console.log( 'closed' );
                        expect( global[ 'terminated_api' ] ).to.equal( true );
                        instance.close( done );
                    } );
                } );
            } );
            client.connect( 'ws://localhost:9999/dummy' );
        } );
    } );

} );