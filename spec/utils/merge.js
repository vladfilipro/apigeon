'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/merge.js' );

describe( 'Apigeon: /core/utils/merge.js', function () {

    it( 'should be a function', function ( done ) {
        expect( victim ).to.be.a( 'function' );
        done();
    } );

    it( 'should merge empty object with any object', function ( done ) {
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

    it( 'should merge object with anything', function ( done ) {
        var output = victim( {
            foo: 1
        }, null );
        expect( output ).to.eql( {
            foo: 1
        } );
        done();
    } );

    it( 'should merge object with null', function ( done ) {
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

    it( 'should merge null object with any object', function ( done ) {
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

    it( 'should merge more than 2 objects', function ( done ) {
        var output = victim( {
            foo: 2
        }, null, {
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
} );
