'use strict';

var SessionClass = require( __dirname + '/../libs/sessionClass' );

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

module.exports = function ( pathDrivers, config ) {
    return function ( req, res, next ) {
        var session = new SessionClass( pathDrivers, config );

        var headerSessionId = getSessionIdFromHeader( req.get( 'Session-Id' ) );

        // Initialize session
        session.start( req.query.sessionid || headerSessionId || ( req.cookies && req.cookies.session ) ).then( function () {
            if ( req.cookies ) {
                res.cookie( 'session', session.getSessionId() );
            }
            req.session = session;
            next();
        } );
    };
};
