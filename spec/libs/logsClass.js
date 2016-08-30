'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/logsClass.js' );
var utils = require( ' ./../../core/utils' );
var path = require( 'path' );

describe( 'Apigeon: /core/libs/logsClass.js', function () {
    var config = {
        table: 'logs',
        driver: 'memory'
    };
    var driversPath = path.dirname( require.resolve( './../../core/drivers/memory' ) );
    var fakeDriversPath = path.dirname( require.resolve( './fakeDrivers/memory-fail' ) );

    it( 'should be a function with 2 parameters', function ( done ) {
        expect( Victim ).to.be.a( 'function' );
        expect( Victim ).to.have.length( 2 );
        done();
    } );

    it( 'instance should have a method start', function ( done ) {
        expect( new Victim( '', config ) ).to.respondTo( 'start' );
        done();
    } );

    it( 'instance should have a method log', function ( done ) {
        expect( new Victim( '', config ) ).to.respondTo( 'log' );
        done();
    } );

    it( 'should save a new entry when calling log method', function ( done ) {
        var data = {
            'key': 'value'
        };
        var dbDriver = utils.getFile( config.driver, [ fakeDriversPath, driversPath ] );
        var logs = new Victim( driversPath, config );
        logs.log( data, function ( id ) {
            expect( typeof id ).to.equal( 'string' );
            dbDriver.select( config.table, id, function ( e, res ) {
                expect( res ).to.eql( data );
                done();
            } );
        } );

    } );

    it( 'should work with defaults if not config specified', function ( done ) {
        var data = {
            'key': 'value'
        };
        var dbDriver = utils.getFile( config.driver, [ fakeDriversPath, driversPath ] );
        var logs = new Victim();
        logs.log( data, function ( id ) {
            expect( typeof id ).to.equal( 'string' );
            dbDriver.select( config.table, id, function ( e, res ) {
                expect( res ).to.eql( data );
                done();
            } );
        } );

    } );

    it( 'should save data defined in start with every log', function ( done ) {
        var data = {
            'key': 'value'
        };
        var dbDriver = utils.getFile( config.driver, [ fakeDriversPath, driversPath ] );
        var logs = new Victim( driversPath, config );
        logs.start( {
            'start': true
        } );
        logs.log( data, function ( id ) {
            expect( typeof id ).to.equal( 'string' );
            dbDriver.select( config.table, id, function ( e, res ) {
                expect( res ).to.eql( {
                    'key': 'value',
                    'start': true
                } );
                done();
            } );
        } );

    } );

    it( 'should ignore save data if not an object', function ( done ) {
        var data = {
            'key': 'value'
        };
        var dbDriver = utils.getFile( config.driver, [ fakeDriversPath, driversPath ] );
        var logs = new Victim( driversPath, config );
        logs.start( 'random string' );
        logs.log( data, function ( id ) {
            expect( typeof id ).to.equal( 'string' );
            dbDriver.select( config.table, id, function ( e, res ) {
                expect( res ).to.eql( {
                    'key': 'value'
                } );
                done();
            } );
        } );

    } );

    it( 'should use the default driver if not found in paths', function ( done ) {
        var dbDriver = utils.getFile( config.driver, [ '', driversPath ] );
        var logs = new Victim( '', config );
        var data = {
            'key': 'value'
        };
        logs.start( 'random string' );
        logs.log( data, function ( id ) {
            expect( typeof id ).to.equal( 'string' );
            dbDriver.select( config.table, id, function ( e, res ) {
                expect( res ).to.eql( {
                    'key': 'value'
                } );
                done();
            } );
        } );

    } );

    it( 'should not throw an error if log callback is not set', function ( done ) {
        var logs = new Victim( fakeDriversPath, {
            table: 'logs',
            driver: 'memory-fail'
        } );
        var data = {
            'key': 'value'
        };
        expect( logs.log( data ) ).to.equal( undefined );
        done();
    } );

    it( 'should return false as a parameter for the callback if log save failed', function ( done ) {
        var logs = new Victim( fakeDriversPath, {
            table: 'logs',
            driver: 'memory-fail'
        } );
        logs.log( {}, function ( res ) {
            expect( res ).to.equal( false );
            done();
        } );

    } );

    it( 'should not throw an error if log callback is not set and insert failed', function ( done ) {
        var logs = new Victim( fakeDriversPath, {
            table: 'logs',
            driver: 'memory-fail'
        } );
        expect( logs.log( {} ) ).to.equal( undefined );
        done();
    } );

} );
