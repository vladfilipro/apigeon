'use strict';

var SessionClass = require( __dirname + '/../libs/sessionClass' );

var getSessionIdFromHeader = function ( header ) {
    var sessionId;
    if ( header ) {
        var parts = header.split( ':' );
        if ( parts.length >= 4 ) {
            sessionId = parts[ 4 ];
        }
    }
    return sessionId;
};

module.exports = function ( config ) {
    return function ( req, res, next ) {
        var session = new SessionClass( config );

        var headerSessionId = getSessionIdFromHeader( req.get( 'Session-Id' ) );

        // Initialize session
        session.start( req.query.sessionid || headerSessionId || req.cookies.session ).then( function () {
            res.cookie( 'session', session.getSessionId() );
            req.session = session;
            next();
        } );
    };
};
