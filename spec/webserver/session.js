'use strict';

var expect = require( 'chai' ).expect;
var url = require( 'url' );
var http = require( 'http' );
var victim = require( './../../core/webserver/session.js' );
var request = require( 'supertest' );
var SessionClass = require( './../../core/libs/sessionClass' );

function DummyServer( input ) {
    var server = http.createServer();
    var plugin = victim();

    //mimic apigeon and attach query to req object
    server.on( 'request', function ( req ) {
        var location = url.parse( req.url, true );
        req.query = location.query;
    } );
    plugin( server );

    this.addServerReply = function ( f ) {
        server.on( 'request', f );
    };

    this.start = function ( url, headers, next ) {
        server.on( 'request', function ( req, res ) {
            console.log( res.getHeader( 'set-cookie' ), input, req.url );
            res.end( input );
        } );
        var instance = server.listen( '8000', function () {
            var r = request( instance ).get( url );
            for ( var i = 0; i < headers.length; i++ ) {
                if ( Array.isArray( headers[ i ] ) ) {
                    r.expect.apply( this, headers[ i ] );
                } else {
                    r.expect( headers[ i ] );
                }
            }
            r.end( function ( err, res ) {
                expect( err ).to.equal( null );
                expect( res.text ).to.equal( input );
                instance.close( next );
            } );
        } );
    };
}

describe( 'Apigeon: /core/webserver/session.js', function () {

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 2 );
        done();
    } );

    it( 'should return a function with 1 parameters', function ( done ) {
        var plugin = victim();
        expect( plugin ).to.be.a( 'function' );
        expect( plugin ).to.have.length( 1 );
        done();
    } );

    it( 'should attach a session instance to the request object when used', function ( done ) {
        var d = new DummyServer( '' );
        d.addServerReply( function ( req ) {
            expect( req.session ).to.be.an.instanceof( SessionClass );
        } );
        d.start( '/', [ 200 ], done );
    } );

    it( 'should retrieve a previous session by passing session id in the query string', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( '/?sessionid=' + sid, [ 200 ], done );
        } );
    } );

    it( 'should save session id to cookie', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( '/?sessionid=' + sid, [
                200, [ 'set-cookie', 'session=' + sid + '; path=/' ]
            ], done );
        } );
    } );

    it( 'should retrieve session id from cookie if available', function ( done ) {
        var startTestCase = function ( sid ) {
            var server = http.createServer();
            var plugin = victim();
            plugin( server );
            server.on( 'request', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = server.listen( '8000', function () {
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
        var session = new SessionClass();
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

    it( 'should retrieve a previous session by passing session id in the header', function ( done ) {
        var startTestCase = function ( sid ) {
            var server = http.createServer();
            var plugin = victim();
            plugin( server );
            server.on( 'request', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = server.listen( '8000', function () {
                request( instance )
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Session-Id', 'SID:ANON:localhost:' + sid + ':34' )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.equal( sid );
                        instance.close( done );
                    } );
            } );
        };

        // Create a session
        var session = new SessionClass();
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

    it( 'should retrieve a previous session by passing session id in the header', function ( done ) {
        var startTestCase = function ( sid ) {
            var server = http.createServer();
            var plugin = victim();
            plugin( server );
            server.on( 'request', function ( req, res ) {
                res.end( req.session.getSessionId() );
            } );
            var instance = server.listen( '8000', function () {
                request( instance )
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Session-Id', 'badheader:localhost:' + sid )
                    .end( function ( err, res ) {
                        expect( err ).to.equal( null );
                        expect( res.text ).to.not.equal( sid );
                        instance.close( done );
                    } );
            } );
        };

        // Create a session
        var session = new SessionClass();
        session.start().then( function () {
            startTestCase( session.getSessionId() );
        } );
    } );

} );
