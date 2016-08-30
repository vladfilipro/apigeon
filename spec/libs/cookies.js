'use strict';

var expect = require( 'chai' ).expect;

var Victim = require( './../../core/libs/cookies.js' );

describe( 'Apigeon: /core/libs/cookies.js', function () {

    it( 'should be an object with 2 properties', function ( done ) {
        expect( Victim ).to.be.a( 'object' );
        expect( Victim.parse ).to.be.a( 'function' );
        expect( Victim.format ).to.be.a( 'function' );
        done();
    } );

    it( 'should return an empty object if parse does not have a value', function ( done ) {
        expect( Victim.parse() ).to.eql( {} );
        done();
    } );

    it( 'should parse a cookie req header when calling parse', function ( done ) {
        expect( Victim.parse( '__utmz=246498266.1469800812.27.26.utmcsr=facebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/' ) ).to.eql( {
            __utmz: '246498266.1469800812.27.26.utmcsr=facebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/'
        } );
        expect( Victim.parse( 'cookie1=test; cookie2=' + encodeURI( 'http://test.com' ) ) ).to.eql( {
            cookie1: 'test',
            cookie2: 'http://test.com'
        } );
        done();
    } );

    it( 'should format text into cookie for header', function ( done ) {
        var now = ( new Date() ).getTime();
        expect( Victim.format( 'cookie1', 'a value' ) ).to.equal( 'cookie1=a%20value; path=/' );
        expect( Victim.format( 'cookie1', 'a value', '/' ) ).to.equal( 'cookie1=a%20value; path=/' );
        expect( Victim.format( 'cookie1', 'a value', '/', now ) ).to.equal( 'cookie1=a%20value; path=/; expires=' + now );
        expect( Victim.format( 'cookie1', 'a value', '/', 0, true ) ).to.equal( 'cookie1=a%20value; path=/; secure' );
        expect( Victim.format( 'cookie1', 'a value', '/', 10, false, true ) ).to.equal( 'cookie1=a%20value; path=/; expires=10; HttpOnly' );
        done();
    } );

} );
