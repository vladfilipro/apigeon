'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/rendererClass.js' );
var path = require( 'path' );
var loadRoute = require( './../../core/libs/loadRoute.js' );
var nativeRenderersFolder = path.dirname( require.resolve( './../../core/renderers/text-plain' ) );
var renderersFolder = path.dirname( require.resolve( './fakeRenderers/hello' ) );
var routesFolder = path.dirname( require.resolve( './fakeRoutes/empty' ) );

describe( 'Apigeon: /core/libs/rendererClass.js', function () {

    it( 'should be a function with 3 parameters', function ( done ) {
        expect( Victim ).to.be.a( 'function' );
        expect( Victim ).to.have.length( 3 );
        done();
    } );

    it( 'should be able to create an instance', function ( done ) {
        expect( new Victim() ).to.be.an.instanceof( Victim );
        done();
    } );

    it( 'should be able to create an instance with the public properties: render, contentType', function ( done ) {
        var victim = new Victim();

        expect( victim.contentType ).to.equal( 'text/plain' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/text-plain' ) );

        done();
    } );

    it( 'should be able to create an instance with different renderers folder', function ( done ) {
        var route = loadRoute( routesFolder, '/empty' );
        var victim = new Victim( renderersFolder, route, 'hello' );
        expect( victim.contentType ).to.equal( 'hello' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( renderersFolder + '/hello' ) );

        done();
    } );

    it( 'should use array of possibilities from constructor and use the closest matching one test 1', function ( done ) {
        var route = loadRoute( routesFolder, '/empty' );
        var victim = new Victim( renderersFolder, route, 'test,application-json' );
        expect( victim.contentType ).to.equal( 'application-json' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/application-json' ) );

        done();
    } );

    it( 'should use array of possibilities from constructor and use the closest matching one test 2', function ( done ) {
        var route = loadRoute( routesFolder, '/fixedrenderer' );
        var victim = new Victim( renderersFolder, route, 'test,application-json' );
        expect( victim.contentType ).to.equal( 'application-json' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/application-json' ) );

        done();
    } );

    it( 'should return first acceptable renderer if no restrictions', function ( done ) {
        var route = loadRoute( routesFolder, '/empty' );
        var victim = new Victim( renderersFolder, route, 'application/json,empty' );
        expect( victim.contentType ).to.equal( 'application/json' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/application-json' ) );

        done();
    } );

    it( 'should use array of possibilities from constructor and use the closest matching one or fallback to default', function ( done ) {
        var route = loadRoute( routesFolder, '/empty' );
        var victim = new Victim( renderersFolder, route, [ 'test,test2' ] );
        expect( victim.contentType ).to.equal( 'text/plain' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/text-plain' ) );

        done();
    } );

    it( 'should load empty renderer if not renderers accepted', function ( done ) {
        var route = loadRoute( routesFolder, '/lockedrenderer' );
        var victim = new Victim( renderersFolder, route, [ 'test,test2' ] );
        expect( victim.contentType ).to.equal( 'empty' );
        expect( typeof victim.render ).to.equal( 'function' );
        expect( victim.render ).to.equal( require( nativeRenderersFolder + '/empty' ) );

        done();
    } );

    it( 'should use return undefined if invalid renderer specified', function ( done ) {
        var route = loadRoute( routesFolder, '/invalidrenderer' );
        var victim = new Victim( renderersFolder, route );
        expect( victim.contentType ).to.equal( undefined );
        expect( victim.render ).to.equal( undefined );

        done();
    } );

} );
