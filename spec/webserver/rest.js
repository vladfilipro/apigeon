// 'use strict';
//
// var expect = require( 'chai' ).expect;
// var http = require( 'http' );
// var victim = require( './../../core/webserver/rest.js' );
// var request = require( 'supertest' );
// var path = require( 'path' );
// var apiPath = path.dirname( require.resolve( './fakeApis/dummy.js' ) );
//
// describe( 'Apigeon: /core/webserver/rest.js', function () {
//
//     it( 'should be a function with 1 parameter', function ( done ) {
//         expect( victim ).to.be.a( 'function' );
//         expect( victim ).to.have.length( 1 );
//         done();
//     } );
//
//     it( 'should return a function with 1 parameters', function ( done ) {
//         var plugin = victim();
//         expect( plugin ).to.be.a( 'function' );
//         expect( plugin ).to.have.length( 1 );
//         done();
//     } );
//
//     it( 'should start a simple rest server which accepts GET methods', function ( done ) {
//         var server = http.createServer();
//         var plugin = victim();
//         plugin( server );
//         var instance = server.listen( '9999', function () {
//             request( instance )
//                 .get( '/' )
//                 .expect( 404 )
//                 .end( function ( e, res ) {
//                     expect( res.status ).to.equal( 404 );
//                     instance.close( done );
//                 } );
//         } );
//     } );
//     //
//     // it( 'should start a simple rest server which accepts POST methods', function ( done ) {
//     //     var app = express();
//     //     app.use( victim() );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .post( '/' )
//     //             .expect( 404 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.status ).to.equal( 404 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should start a simple rest server which accepts PUT methods', function ( done ) {
//     //     var app = express();
//     //     app.use( victim() );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .put( '/' )
//     //             .expect( 404 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.status ).to.equal( 404 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should start a simple rest server which accepts DELETE methods', function ( done ) {
//     //     var app = express();
//     //     app.use( victim() );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .delete( '/' )
//     //             .expect( 404 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.status ).to.equal( 404 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should start a simple rest server which accepts GET method and uses default renderer if not defined', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/dummy' )
//     //             .expect( 200 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.text ).to.equal( 'Hello' );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should output result of api', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/dummy?bad=true' )
//     //             .expect( 500 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.status ).to.equal( 500 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should return renderer as content type', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/dummy' )
//     //             .expect( 200 )
//     //             .end( function ( e, res ) {
//     //                 expect( res.headers[ 'content-type' ] ).to.equal( 'text/plain; charset=utf-8' );
//     //                 expect( res.text ).to.equal( 'Hello' );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should send accept header to renderer', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/lockedrenderer' )
//     //             .set( 'Accept', 'application/json' )
//     //             .end( function ( e, res ) {
//     //                 expect( res.headers[ 'content-type' ] ).to.equal( 'application/json' );
//     //                 expect( res.text ).to.equal( JSON.stringify( {
//     //                     'name': 'Hello'
//     //                 } ) );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should call api terminate at the end of execute, on success', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/dummy' )
//     //             .expect( 200 )
//     //             .end( function () {
//     //                 expect( global[ 'terminated_api' ] ).to.equal( true );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should call api terminate at the end of execute, on error', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/dummy?bad=true' )
//     //             .expect( 500 )
//     //             .end( function () {
//     //                 expect( global[ 'terminated_api' ] ).to.equal( true );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should be able to use server redirects', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/redirect' )
//     //             .end( function ( e, res ) {
//     //                 expect( res.headers.location ).to.equal( 'http://fake.com' );
//     //                 expect( res.status ).to.equal( 302 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should respect apis methodAllowed returns', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .post( '/noaccess-method' )
//     //             .end( function ( e, res ) {
//     //                 expect( res.status ).to.equal( 405 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
//     // it( 'should respect apis protocolAllowed returns', function ( done ) {
//     //     var app = express();
//     //     app.use( victim( {
//     //         apis: apiPath
//     //     } ) );
//     //     var instance = app.listen( '9999', function () {
//     //         request( instance )
//     //             .get( '/noaccess-protocol' )
//     //             .end( function ( e, res ) {
//     //                 expect( res.text ).to.equal( '{"error":{"code":403,"message":"Access denied."}}' );
//     //                 expect( res.status ).to.equal( 403 );
//     //                 instance.close( done );
//     //             } );
//     //     } );
//     // } );
//     //
// } );
