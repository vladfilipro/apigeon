'use strict';

var WebSocketServer = require( 'ws' ).Server;

module.exports = function ( server, paths ) {

    var ws = new WebSocketServer( {
        server: server
    } );

    ws.on( 'connection', function connection( socket ) {
        var location = url.parse( socket.upgradeReq.url, true );

        // you might use location.query.access_token to authenticate or share sessions
        // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

        socket.on( 'message', function incoming( message ) {
            console.log( 'received: %s', message );
        } );

        socket.send( 'something' );
    } );

    return function ( req, res ) {


    };
};
