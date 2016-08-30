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

            config = config || {};
            config.paths = config.paths || {};

            var session = new SessionClass( config.paths.drivers, sessionConfig );

            var headerSessionId = getSessionIdFromHeader( req.headers[ 'session-id' ] );

            req.query = req.query || {};

            // Initialize session
            session.start( req.query.sessionid || headerSessionId || cookies.parse( req.headers.cookie ).session ).then( function () {
                res.setHeader( 'Set-Cookie', cookies.format( 'session', session.getSessionId() ) );
                req.session = session;
            } );

        } );

    };

};
