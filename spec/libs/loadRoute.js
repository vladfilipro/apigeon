'use strict';

var expect = require( 'chai' ).expect;
var path = require( 'path' );
var victim = require( './../../core/libs/loadRoute.js' );
var ErrorClass = require( './../../core/libs/errorClass.js' );
var routesFolder = path.dirname( require.resolve( './fakeRoutes/empty' ) );

describe( 'Apigeon: /core/libs/loadRoute.js', function () {

    it( 'should be a function with 3 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 3 );
        done();
    } );

    it( 'should return false if a class with the specific name cannot be found', function ( done ) {
        var route = victim();
        expect( route ).to.equal( false );
        done();
    } );

    it( 'should return an instance of the Route', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        expect( route ).to.be.an.instanceof( require( routesFolder + '/empty' ) );
        done();
    } );

    it( 'should return an object with methods', function ( done ) {
        var route = victim( routesFolder, '/empty', {
            'request': true
        } );
        expect( route ).to.respondTo( 'hasAccess' );
        expect( route ).to.respondTo( 'methodAllowed' );
        expect( route ).to.respondTo( 'protocolAllowed' );
        expect( route ).to.respondTo( 'execute' );
        expect( route ).to.respondTo( 'terminate' );
        expect( route ).to.respondTo( '_getData' );
        expect( route.Error ).to.equal( ErrorClass );
        expect( route.request ).to.eql( {
            'request': true
        } );
        done();
    } );

    it( 'method hasAccess should return `true` by default', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        expect( route.hasAccess() ).to.equal( true );
        done();
    } );

    it( 'method methodAllowed should return `true` by default', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        expect( route.methodAllowed() ).to.equal( true );
        done();
    } );

    it( 'method protocolAllowed should return `true` by default', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        expect( route.protocolAllowed() ).to.equal( true );
        done();
    } );

    it( 'method terminate should return `true` by default', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        expect( route.terminate() ).to.equal( true );
        done();
    } );

    it( 'should return 403 error in error callback when executing _getData, if hasAccess returns false', function ( done ) {
        var route = victim( routesFolder, '/noaccess', {} );
        route._getData( function () {}, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 403 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 501 error in error callback when executing _getData, if no execute method exists', function ( done ) {
        var route = victim( routesFolder, '/empty', {} );
        route._getData( function () {}, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 501 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 500 error in error callback when executing _getData failed', function ( done ) {
        var route = victim( routesFolder, '/dummy', {
            bad: true
        } );
        route._getData( function () {
            expect( 1 ).to.equal( 2 );
        }, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 500 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 200 code and data in callback when executing _getData was successful', function ( done ) {
        var route = victim( routesFolder, '/dummy', {
            good: true
        } );
        route._getData( function ( data, code ) {
            expect( code ).to.equal( 200 );
            expect( data ).to.equal( 'good' );
            done();
        }, function () {
            expect( 1 ).to.equal( 2 );
        } );
    } );

    it( 'should return custom code and data in callback when executing _getData was successful', function ( done ) {
        var route = victim( routesFolder, '/dummy', {
            code: true
        } );
        route._getData( function ( data, code ) {
            expect( code ).to.equal( 100 );
            expect( data ).to.equal( 'good' );
            done();
        }, function () {
            expect( 1 ).to.equal( 2 );
        } );
    } );

} );
