'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/utils/promise.js' );

describe( 'Apigeon: /core/utils/promise.js', function () {

    it( 'should be an object', function ( done ) {
        expect( victim ).to.be.a( 'object' );
        done();
    } );

    it( 'should have a property promise of type function', function ( done ) {
        expect( victim.promise ).to.be.a( 'function' );
        done();
    } );

    it( 'should have a property all of type function', function ( done ) {
        expect( victim.all ).to.be.a( 'function' );
        done();
    } );

} );

describe( 'Apigeon: /core/utils/promise.js -> all', function () {

    it( 'should accept an array of promises result and return a promise result', function ( done ) {
        var p1 = victim.promise();
        var p2 = victim.promise();
        var promise = victim.all( [ p1.result, p2.result ] );
        expect( promise ).to.have.property( 'then' );
        expect( promise ).to.have.property( 'error' );
        expect( promise ).to.have.property( 'success' );
        done();
    } );

    it( 'should call success and then but not error when all promises have been resolved', function ( done ) {
        var p1 = victim.promise();
        var p2 = victim.promise();
        var promise = victim.all( [ p1.result, p2.result ] );
        promise.then( function ( e, data ) {
            expect( e ).to.equal( null );
            expect( data ).to.equal( true );
            done();
        } );
        promise.success( function ( data ) {
            expect( data ).to.equal( true );
        } );
        promise.error( function ( e ) {
            expect( e ).to.equal( 'this should not be called' );
        } );
        p1.resolve( true );
        p2.resolve( true );
    } );

    it( 'should call error and then but not success when at least one promise has been rejected', function ( done ) {
        var p1 = victim.promise();
        var p2 = victim.promise();
        var promise = victim.all( [ p1.result, p2.result ] );
        promise.then( function ( e, data ) {
            expect( e ).to.equal( true );
            expect( data ).to.equal( null );
            done();
        } );
        promise.success( function ( data ) {
            expect( data ).to.equal( 'this should not be called' );
        } );
        promise.error( function ( e ) {
            expect( e ).to.equal( true );
        } );
        p1.reject( true );
        p2.resolve( true );
    } );

} );

describe( 'Apigeon: /core/utils/promise.js -> promise', function () {

    it( 'should have resolve, reject, and result methods', function ( done ) {
        var promise = victim.promise();
        expect( promise ).to.have.property( 'resolve' );
        expect( promise ).to.have.property( 'reject' );
        expect( promise ).to.have.property( 'result' );
        done();
    } );

    it( 'should have a property result which has the properties then, success, error', function ( done ) {
        var promise = victim.promise();
        expect( promise.result ).to.have.property( 'then' );
        expect( promise.result ).to.have.property( 'success' );
        expect( promise.result ).to.have.property( 'error' );
        done();
    } );

    it( 'should throw error when trying to resolve multiple times', function ( done ) {
        var promise = victim.promise();
        promise.resolve( true );
        expect( promise.resolve.bind( true ) ).to.throw( 'Promise has already been resolved.' );
        done();
    } );

    it( 'should throw error when trying to reject multiple times', function ( done ) {
        var promise = victim.promise();
        promise.reject( true );
        expect( promise.reject.bind( true ) ).to.throw( 'Promise has already been resolved.' );
        done();
    } );

    it( 'should throw error when trying to reject or resolve multiple times', function ( done ) {
        var promise = victim.promise();
        promise.reject( true );
        expect( promise.resolve.bind( true ) ).to.throw( 'Promise has already been resolved.' );
        done();
    } );

    it( 'should call functions sent to then, success when resolved, and not error', function ( done ) {
        var promise = victim.promise();
        promise.result.then( function ( e, data ) {
            expect( e ).to.equal( null );
            expect( data ).to.equal( 'yes' );
            done();
        } );
        promise.result.success( function ( data ) {
            expect( data ).to.equal( 'yes' );
        } );
        promise.result.error( function ( e ) {
            expect( e ).to.equal( 'this should not be called' );
        } );
        promise.resolve( 'yes' );
    } );

    it( 'should call functions sent to then, success when resolved (before result returned), and not error', function ( done ) {
        var promise = victim.promise();
        promise.resolve( 'yes' );
        promise.result.then( function ( e, data ) {
            expect( e ).to.equal( null );
            expect( data ).to.equal( 'yes' );
            done();
        } );
        promise.result.success( function ( data ) {
            expect( data ).to.equal( 'yes' );
        } );
        promise.result.error( function ( e ) {
            expect( e ).to.equal( 'this should not be called' );
        } );
    } );

    it( 'should call functions sent to then, error when rejected, and not success', function ( done ) {
        var promise = victim.promise();
        promise.result.then( function ( e, data ) {
            expect( e ).to.equal( 'err' );
            expect( data ).to.equal( null );
            done();
        } );
        promise.result.success( function ( data ) {
            expect( data ).to.equal( 'this should not be called' );
        } );
        promise.result.error( function ( e ) {
            expect( e ).to.equal( 'err' );
        } );
        promise.reject( 'err' );
    } );

    it( 'should call functions sent to then, error when rejected (before result returned), and not success', function ( done ) {
        var promise = victim.promise();
        promise.reject( 'err' );
        promise.result.then( function ( e, data ) {
            expect( e ).to.equal( 'err' );
            expect( data ).to.equal( null );
            done();
        } );
        promise.result.success( function ( data ) {
            expect( data ).to.equal( 'this should not be called' );
        } );
        promise.result.error( function ( e ) {
            expect( e ).to.equal( 'err' );
        } );
    } );

} );
