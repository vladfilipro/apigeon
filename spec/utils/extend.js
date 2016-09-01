'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/extend.js' );

describe( 'Apigeon: /core/utils/extend.js', function () {

    it( 'should be a function', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        done();
    } );

    it( 'should extend empty object with any object', function ( done ) {
        var output = victim( {}, {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        expect( output ).to.eql( {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        done();
    } );

    it( 'should extend object with anything', function ( done ) {
        var output = victim( {
            foo: 1
        }, {} );
        expect( output ).to.eql( {
            foo: 1
        } );
        done();
    } );

    it( 'should extend object with null', function ( done ) {
        var output = victim( {
            foo: 1,
            bar: {
                foo: 1
            }
        }, null );
        expect( output ).to.eql( {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        done();
    } );

    it( 'should extend null object with any object', function ( done ) {
        var output = victim( null, {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        expect( output ).to.eql( {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        done();
    } );

    it( 'should extend more than 2 objects', function ( done ) {
        var output = victim( {
            foo: 2,
            xx: 2
        }, null, {
            foo: 1,
            bar: {
                foo: 1
            }
        } );
        expect( output ).to.eql( {
            foo: 1,
            xx: 2,
            bar: {
                foo: 1
            }
        } );
        done();
    } );

    it( 'should extend deep properties', function ( done ) {
        var output = victim( {
            paths: {
                routes: null,
                drivers: null,
                renderers: null
            },
            errors: {},
            httpsOptions: null
        }, {
            paths: {
                routes: '/apigeon/spec/webserver/fakeRoutes'
            },
            name: 'new'
        } );
        expect( output ).to.eql( {
            paths: {
                routes: '/apigeon/spec/webserver/fakeRoutes',
                drivers: null,
                renderers: null
            },
            errors: {},
            httpsOptions: null,
            name: 'new'
        } );
        done();
    } );
} );
