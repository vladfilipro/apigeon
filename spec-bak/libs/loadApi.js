'use strict';

var expect = require( 'chai' ).expect;
var path = require( 'path' );
var victim = require( './../../core/libs/loadApi.js' );
var ErrorClass = require( './../../core/libs/errorClass.js' );
var apiFolder = path.dirname( require.resolve( './fakeApis/empty' ) );

describe( 'Apigeon: /core/libs/loadApi.js', function () {

    it( 'should be a function with 3 parameters', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        expect( victim ).to.have.length( 3 );
        done();
    } );

    it( 'should return false if a class with the specific name cannot be found', function ( done ) {
        var api = victim();
        expect( api ).to.equal( false );
        done();
    } );

    it( 'should return an instance of the Api', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api ).to.be.an.instanceof( require( apiFolder + '/empty' ) );
        done();
    } );

    it( 'should return an object with methods', function ( done ) {
        var api = victim( apiFolder, '/empty', {
            'request': true
        } );
        expect( api ).to.respondTo( 'getAcceptedRenderers' );
        expect( api ).to.respondTo( 'hasAccess' );
        expect( api ).to.respondTo( 'methodAllowed' );
        expect( api ).to.respondTo( 'protocolAllowed' );
        expect( api ).to.respondTo( 'execute' );
        expect( api ).to.respondTo( 'terminate' );
        expect( api ).to.respondTo( '_getData' );
        expect( api.Error ).to.equal( ErrorClass );
        expect( api.request ).to.eql( {
            'request': true
        } );
        done();
    } );

    it( 'method getAcceptedRenderers should return true by default', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api.getAcceptedRenderers() ).to.equal( true );
        done();
    } );

    it( 'method hasAccess should return `true` by default', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api.hasAccess() ).to.equal( true );
        done();
    } );

    it( 'method methodAllowed should return `true` by default', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api.methodAllowed() ).to.equal( true );
        done();
    } );

    it( 'method protocolAllowed should return `true` by default', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api.protocolAllowed() ).to.equal( true );
        done();
    } );

    it( 'method terminate should return `true` by default', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        expect( api.terminate() ).to.equal( true );
        done();
    } );

    it( 'should return 403 error in error callback when executing _getData, if hasAccess returns false', function ( done ) {
        var api = victim( apiFolder, '/noaccess', {} );
        api._getData( function () {}, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 403 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 501 error in error callback when executing _getData, if no execute method exists', function ( done ) {
        var api = victim( apiFolder, '/empty', {} );
        api._getData( function () {}, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 501 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 500 error in error callback when executing _getData failed', function ( done ) {
        var api = victim( apiFolder, '/dummy', {
            bad: true
        } );
        api._getData( function () {
            expect( 1 ).to.equal( 2 );
        }, function ( e ) {
            expect( e ).to.be.instanceof( ErrorClass );
            var error = new ErrorClass( 500 );
            expect( e.getCode() ).to.equal( error.getCode() );
            done();
        } );
    } );

    it( 'should return 200 code and data in callback when executing _getData was successful', function ( done ) {
        var api = victim( apiFolder, '/dummy', {
            good: true
        } );
        api._getData( function ( data, code ) {
            expect( code ).to.equal( 200 );
            expect( data ).to.equal( 'good' );
            done();
        }, function () {
            expect( 1 ).to.equal( 2 );
        } );
    } );

    it( 'should return custom code and data in callback when executing _getData was successful', function ( done ) {
        var api = victim( apiFolder, '/dummy', {
            code: true
        } );
        api._getData( function ( data, code ) {
            expect( code ).to.equal( 100 );
            expect( data ).to.equal( 'good' );
            done();
        }, function () {
            expect( 1 ).to.equal( 2 );
        } );
    } );

} );
