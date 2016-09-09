'use strict';

var SessionClass = require( __dirname + '/../../libs/sessionClass' );
var cookies = require( __dirname + '/../../libs/cookies' );

var loadConfig = function ( config ) {
    config = config || {};
    config.paths = config.paths || {};
    return config;
};

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

    config = loadConfig( config );

    return function ( req, res, done ) {

        var session = new SessionClass( config.paths.drivers, sessionConfig );

        var headerSessionId = getSessionIdFromHeader( req.headers[ 'session-id' ] );

        req.query = req.query || {};

        // Initialize session
        session.start( req.query.sessionid || headerSessionId || cookies.parse( req.headers.cookie ).session ).then( function () {
            res.setHeader( 'set-cookie', cookies.format( 'session', session.getSessionId() ) );
            req.session = session;
            done();
        } );

    };

};
