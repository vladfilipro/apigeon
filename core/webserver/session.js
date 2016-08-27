'use strict';

var SessionClass = require( __dirname + '/../libs/sessionClass' );
var cookies = require( __dirname + '/../libs/cookies' );

var getSessionIdFromHeader = function ( header ) {
    var sessionId;
    if ( header ) {
        var parts = header.split( ':' );
        if ( parts.length > 3 ) {
            sessionId = parts[ 3 ];
        }
    }
    return sessionId;
};

module.exports = function ( config, sessionConfig ) {

    return function ( server ) {

        server.on( 'request', function ( req, res ) {

            var session = new SessionClass( config.paths.drivers, sessionConfig );

            var headerSessionId = getSessionIdFromHeader( req.headers[ 'Session-Id' ] );

            // Initialize session
            session.start( req.query.sessionid || headerSessionId || cookies.parse( req.headers.cookies ).session ).then( function () {
                if ( req.cookies ) {
                    res.setHeader( 'Set-Cookie', cookies.format( 'session', session.getSessionId() ) );
                }
                req.session = session;
            } );

        } );

    };

};
