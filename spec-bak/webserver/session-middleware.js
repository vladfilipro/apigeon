'use strict';

var expect = require( 'chai' ).expect;

var express = require( 'express' );
var victim = require( './../../core/webserver/session-middleware.js' );
var request = require( 'supertest' );
var SessionClass = require( './../../core/libs/sessionClass' );

var config = {
    table: 'session',
    driver: 'memory'
};

describe( 'Apigeon: /core/webserver/session-middleware.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should return a function with 3 parameters', function ( done ) {
        expect( victim() ).to.be.a( 'function' );
        expect( victim() ).to.have.length( 3 );
        done();
    } );

    it( 'should attach a session instance to the request object when used', function ( done ) {
        var app = express();
        app.use( victim( null, config ) );
        app.get( '/', function ( req, res ) {
            expect( req.session ).to.be.an.instanceof( SessionClass );
            res.end( '' );
        } );
        var instance = app.listen( '9999', function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( err, res ) {
                    expect( err ).to.equal( null );
                    expect( res.text ).to.equal( '' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should work with no config object specified', function ( done ) {
        var app = express();
        app.use( victim( null ) );
        app.get( '/', function ( req, res ) {
            expect( req.session ).to.be.an.instanceof( SessionClass );
            res.end( '' );
        } );
        var instance = app.listen( '9999', function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( err, res ) {
                    expect( err ).to.equal( null );
                    expect( res.text ).to.equal( '' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should work with no table specified', function ( done ) {
        var app = express();
        app.use( victim( null, {} ) );
        app.get( '/', function ( req, res ) {
            expect( req.session ).to.be.an.instanceof( SessionClass );
            res.end( '' );
        } );
        var instance = app.listen( '9999', function () {
            request( instance )
                .get( '/' )
                .expect( 200 )
                .end( function ( err, res ) {
                    expect( err ).to.equal( null );
                    expect( res.text ).to.equal( '' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should retrieve a previous session by passing session id in the query string', function ( done ) {
        var startTestCase = function ( sid ) {
            var app = express();
            app.use( victim( null, config ) );
            app.get( '/', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = app.listen( '9999', function () {
                request( instance )
                    .get( '/?sessionid=' + sid )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.equal( sid );
                        instance.close( done );
                    } );
            } );

        };

        // Create a session
        var session = new SessionClass( null, config );
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

    it( 'should save session id to cookie if available', function ( done ) {
        var startTestCase = function ( sid ) {
            var app = express();
            app.use( require( 'cookie-parser' )() );
            app.use( victim( null, config ) );
            app.get( '/', function ( req, res ) {
                res.end( '' );
            } );
            var instance = app.listen( '9999', function () {
                request.agent( app )
                    .get( '/?sessionid=' + sid )
                    .expect( 'set-cookie', 'session=' + sid + '; Path=/', function () {
                        instance.close( done );
                    } );
            } );
        };

        // Create a session
        var session = new SessionClass( null, config );
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

    it( 'should retrieve session id from cookie if available', function ( done ) {
        var startTestCase = function ( sid ) {
            var app = express();
            app.use( require( 'cookie-parser' )() );
            app.use( victim( null, config ) );
            app.get( '/', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = app.listen( '9999', function () {
                request( instance )
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Cookie', 'session=' + sid )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.equal( sid );
                        instance.close( done );
                    } );
            } );

        };

        // Create a session
        var session = new SessionClass( null, config );
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );

    } );

    it( 'should retrieve a previous session by passing session id in the header', function ( done ) {
        var startTestCase = function ( sid ) {
            var app = express();
            app.use( require( 'cookie-parser' )() );
            app.use( victim( null, config ) );
            app.get( '/', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = app.listen( '9999', function () {
                request( instance )
                    .get( '/' )
                    .set( 'Session-Id', 'SID:ANON:localhost:' + sid + ':34' )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.equal( sid );
                        instance.close( done );
                    } );
            } );

        };

        // Create a session
        var session = new SessionClass( null, config );
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

    it( 'should ignore non-w3c header standard for session-id header', function ( done ) {
        var startTestCase = function ( sid ) {
            var app = express();
            app.use( require( 'cookie-parser' )() );
            app.use( victim( null, config ) );
            app.get( '/', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = app.listen( '9999', function () {
                request( instance )
                    .get( '/' )
                    .set( 'Session-Id', 'badheader:localhost:' + sid )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.not.equal( sid );
                        instance.close( done );
                    } );
            } );

        };

        // Create a session
        var session = new SessionClass( null, config );
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

} );
