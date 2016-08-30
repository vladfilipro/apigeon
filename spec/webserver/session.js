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

    this.start = function ( cb, next ) {
        server.on( 'request', function ( req, res ) {
            res.end( input );
        } );
        var instance = server.listen( '8000', function () {
            var r = request( instance );
            r = cb( r );
            r.end( function ( err, res ) {
                if ( err ) {
                    console.log( err );
                    throw err;
                }
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
        var server = http.createServer();
        var plugin = victim();
        plugin( server );
        server.on( 'request', function ( req, res ) {
            res.end( '' );
        } );
        var instance = server.listen( '8000', function () {
            request( instance )
                .get( '/' )
                .end( function ( err, res ) {
                    if ( err ) {
                        console.log( err );
                        throw err;
                    }
                    expect( res.text ).to.equal( '' );
                    instance.close( done );
                } );
        } );
    } );

    it( 'should retrieve a previous session by passing session id in the query string', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( function ( r ) {
                return r
                    .get( '/?sessionid=' + sid )
                    .expect( 200 );
            }, done );
        } );
    } );

    it( 'should save session id to cookie', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( function ( r ) {
                return r
                    .get( '/?sessionid=' + sid )
                    .expect( 200 )
                    .expect( 'set-cookie', 'session=' + sid + '; path=/' );
            }, done );
        } );
    } );

    it( 'should retrieve session id from cookie if available', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( function ( r ) {
                return r
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Cookie', 'session=' + sid );
            }, done );
        } );
    } );

    it( 'should retrieve a previous session by passing session id in the header', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( function ( r ) {
                return r
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Session-Id', 'SID:ANON:localhost:' + sid + ':34' );
            }, done );
        } );
    } );

    it( 'should create a new session if invalid header', function ( done ) {
        var session = new SessionClass();
        session.start().then( function () {
            var sid = session.getSessionId();
            var d = new DummyServer( sid );
            d.start( function ( r ) {
                return r
                    .get( '/' )
                    .expect( 200 )
                    .set( 'Session-Id', 'badheader:localhost:' + sid );
            }, done );
        } );
    } );

} );
