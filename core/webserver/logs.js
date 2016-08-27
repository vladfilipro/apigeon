'use strict';

var utils = require( __dirname + '/../utils' );
var LogsClass = require( __dirname + '/../libs/logsClass' );

module.exports = function ( config, logsConfig ) {

    return function ( server ) {

        server.on( 'request', function ( req ) {

            // Initialize logging
            var logs = new LogsClass( config.paths.drivers, logsConfig );
            logs.start( {
                id: utils.uniqueId(),
                ip: req.socket.remoteAddress,
                route: req.url,
                agent: req.headers[ 'User-Agent' ]
            } );
            req.logs = logs;

        } );

    };

};
