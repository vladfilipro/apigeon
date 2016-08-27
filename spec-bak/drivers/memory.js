'use strict';

var expect = require( 'chai' ).expect;

var victim = require( './../../core/drivers/memory.js' );

describe( 'Apigeon: /core/drivers/memory.js', function () {

    var table = 'test';

    it( 'should be an object with 4 properties, select, insert, update, delete', function ( done ) {
        expect( Object.keys( victim ).length ).to.equal( 4 );
        expect( victim ).to.have.property( 'select' );
        expect( victim ).to.have.property( 'insert' );
        expect( victim ).to.have.property( 'update' );
        expect( victim ).to.have.property( 'delete' );
        done();
    } );

    beforeEach( function ( done ) {
        global[ table ] = {};
        victim.insert( table, 1, {
            'a': 'a',
            'b': {
                'c': 1
            },
            'd': 1
        }, function () {
            done();
        } );
    } );

    afterEach( function ( done ) {
        victim.delete( table, 1, function () {
            done();
        } );
        delete global[ table ];
    } );

    it( ' should create the table if it doesn\'t exist on insert', function ( done ) {
        delete global[ table ];
        victim.insert( table, 1, {}, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            done();
        } );
    } );

    it( ' should create the table if it doesn\'t exist on update', function ( done ) {
        delete global[ table ];
        victim.update( table, 1, {}, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            expect( global[ table ] ).to.not.be.undefined;
            done();
        } );
    } );

    it( ' should create the table if it doesn\'t exist on select', function ( done ) {
        delete global[ table ];
        victim.select( table, 1, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            expect( global[ table ] ).to.not.be.undefined;
            done();
        } );
    } );

    it( ' should create the table if it doesn\'t exist on delete', function ( done ) {
        delete global[ table ];
        victim.delete( table, 1, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            expect( global[ table ] ).to.not.be.undefined;
            done();
        } );
    } );

    it( ' should return an object when calling select', function ( done ) {
        victim.select( table, 1, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.have.property( 'a', 'a' );
            expect( data ).to.have.property( 'b' );
            expect( data.b ).to.eql( {
                'c': 1
            } );
            expect( data ).to.have.property( 'd', 1 );
            done();
        } );
    } );

    it( ' should not return an error when calling select on an inexistant primary', function ( done ) {
        victim.select( table, 2, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            done();
        } );
    } );

    it( ' should store an object when calling insert', function ( done ) {
        victim.insert( table, 2, {
            'a': 'a',
            'b': {
                'c': 1
            },
            'd': 1
        }, function () {
            victim.select( table, 2, function ( e, data ) {
                expect( e ).to.be.null;
                expect( data ).to.have.property( 'a', 'a' );
                expect( data ).to.have.property( 'b' );
                expect( data.b ).to.eql( {
                    'c': 1
                } );
                expect( data ).to.have.property( 'd', 1 );
                done();
            } );
        } );
    } );

    it( ' should return and error when calling insert with invalid primary', function ( done ) {
        victim.insert( table, 1, {
            'a': 'b'
        }, function ( e, data ) {
            expect( e ).to.not.be.null;
            expect( data ).to.be.null;
            done();
        } );
    } );

    it( ' should update an object when calling update', function ( done ) {
        victim.update( table, 1, {
            'a': 'b'
        }, function () {
            victim.select( table, 1, function ( e, data ) {
                expect( e ).to.be.null;
                expect( data ).to.have.property( 'a', 'b' );
                expect( data ).to.have.property( 'b' );
                expect( data.b ).to.eql( {
                    'c': 1
                } );
                expect( data ).to.have.property( 'd', 1 );
                done();
            } );
        } );
    } );

    it( ' should stringify object property if an object was given when calling update', function ( done ) {
        victim.update( table, 1, {
            'a': {
                'e': 1
            }
        }, function () {
            victim.select( table, 1, function ( e, data ) {
                expect( e ).to.be.null;
                expect( data ).to.have.property( 'a' );
                expect( data.a ).to.eql( {
                    'e': 1
                } );
                expect( data ).to.have.property( 'b' );
                expect( data.b ).to.eql( {
                    'c': 1
                } );
                expect( data ).to.have.property( 'd', 1 );
                done();
            } );
        } );
    } );

    it( ' should return error on update with invalid primary', function ( done ) {
        victim.update( table, 10, {
            'a': 'b'
        }, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            done();
        } );
    } );

    it( ' should delete an object when calling delete', function ( done ) {
        victim.delete( table, 1, function () {
            victim.select( table, 1, function ( e, data ) {
                expect( e ).to.be.null;
                expect( data ).to.not.be.null;
                done();
            } );
        } );
    } );

    it( ' should return error when trying to delete inexistant primary', function ( done ) {
        victim.delete( table, 5, function ( e, data ) {
            expect( e ).to.be.null;
            expect( data ).to.not.be.null;
            done();
        } );
    } );

} );
