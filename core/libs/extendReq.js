'use strict';

var url = require( 'url' );
var Config = require( './configClass' );

var getProtocol = function ( req ) {
    return req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' );
};

module.exports = function ( req, config ) {
    config = new Config( config );
    var location = url.parse( config.get( 'rewrite' )( req.url ), true );
    req.pathname = req.pathname || location.pathname;
    req.protocol = req.protocol || getProtocol( req );
    req.query = req.query || location.query;
};
