'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/sessionClass.js' );
var utils = require( ' ./../../core/utils' );
var path = require( 'path' );

describe( 'Apigeon: /core/libs/sessionClass.js', function () {
    var config = {
        table: 'session',
        driver: 'memory'
    };

    var driversPath = path.dirname( require.resolve( './../../core/drivers/memory' ) );
    var fakeDriversPath = path.dirname( require.resolve( './fakeDrivers/memory-fail' ) );

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( Victim ).to.be.a( 'function' );
        expect( Victim ).to.have.length( 2 );
        done();
    } );

    it( 'should have a method start with one parameter that should return a promise result', function ( done ) {
        var session = new Victim( '', config );
        expect( session.start ).to.be.a( 'function' );
        expect( session.start ).to.have.length( 1 );
        var promise = session.start();
        expect( promise.then ).to.be.a( 'function' );
        expect( promise.success ).to.be.a( 'function' );
        expect( promise.error ).to.be.a( 'function' );
        promise.then( function () {
            done();
        } );
    } );

    it( 'should have a method update, set, get, remove, getSessionId', function ( done ) {
        var session = new Victim( driversPath, config );
        expect( session.update ).to.be.a( 'function' );
        expect( session.set ).to.be.a( 'function' );
        expect( session.get ).to.be.a( 'function' );
        expect( session.remove ).to.be.a( 'function' );
        expect( session.getSessionId ).to.be.a( 'function' );
        done();
    } );

    it( 'should return the session id when calling getSessionId', function ( done ) {
        var session = new Victim( driversPath, config );
        session.start( 1 ).then( function () {
            expect( session.getSessionId() ).to.be.a( 'string' );
            done();
        } );
    } );

    it( 'should set a variable in session when calling set() and should be able to retrieve it when using get()', function ( done ) {
        var session = new Victim( driversPath, config );
        session.start().then( function () {
            session.set( 'test_key', 'test_value' );
            expect( session.get( 'test_key' ) ).to.equal( 'test_value' );
            done();
        } );
    } );

    it( 'should be able to remove a variable from session when calling remove()', function ( done ) {
        var session = new Victim( driversPath, config );
        session.start().then( function () {
            session.set( 'test_key', 'test_value' );
            session.remove( 'test_key' );
            expect( session.get( 'test_key' ) ).to.equal( undefined );
            done();
        } );
    } );

    it( 'should set a variable in session (storage) when calling set() and update()', function ( done ) {
        var session = new Victim( driversPath, config );
        session.start().then( function () {
            session.set( 'test_key', 'test_value' );
            session.update().then( function () {
                var dbDriver = utils.getFile( config.driver, [ '', driversPath ] );
                dbDriver.select( config.table, session.getSessionId(), function ( e, res ) {
                    expect( res.data ).to.eql( {
                        'test_key': 'test_value'
                    } );
                    done();
                } );
            } );
        } );
    } );

    it( 'should return a value for the sart callback error parameter if insert failed', function ( done ) {
        var session = new Victim( fakeDriversPath, {
            table: 'session',
            driver: 'memory-fail'
        } );
        session.start( 1 ).then( function ( e ) {
            expect( e ).to.equal( true );
            done();
        } );
    } );

    it( 'should return a value for the update callback error parameter if update failed', function ( done ) {
        var session = new Victim( fakeDriversPath, {
            table: 'session',
            driver: 'memory-update-fail'
        } );
        session.start().then( function () {
            session.update().then( function ( e ) {
                expect( e ).to.equal( true );
                done();
            } );
        } );
    } );

    it( 'should return a value for the update callback error parameter if update called without start', function ( done ) {
        var session = new Victim( fakeDriversPath, {
            table: 'session',
            driver: 'memory-update-fail'
        } );
        session.update().then( function ( e ) {
            expect( e ).to.equal( true );
            done();
        } );
    } );

    it( 'should be able to continue an already started session', function ( done ) {
        var oldsession = new Victim( driversPath, config );
        oldsession.start().then( function () {
            oldsession.set( 'test_key', 'test_value' );
            oldsession.update().then( function () {

                var session = new Victim( driversPath, config );
                session.start( oldsession.getSessionId() ).then( function () {
                    expect( session.get( 'test_key' ) ).to.equal( 'test_value' );
                    done();
                } );

            } );
        } );
    } );

} );
