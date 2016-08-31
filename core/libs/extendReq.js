'use strict';

var url = require( 'url' );

var getProtocol = function ( req ) {
    return req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' );
};

module.exports = function ( req, config ) {
    var location = url.parse( config.rewrite( req.url ), true );
    req.pathname = req.pathname || location.pathname;
    req.protocol = req.protocol || getProtocol( req );
    req.query = req.query || location.query;
};
