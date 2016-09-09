'use strict';

var utils = require( __dirname + '/../../utils' );
var LogsClass = require( __dirname + '/../../libs/logsClass' );

var loadConfig = function ( config ) {
    config = config || {};
    config.paths = config.paths || {};
    return config;
};

module.exports = function ( config, logsConfig ) {

    config = loadConfig( config );

    return function ( req, res, done ) {

        // Initialize logging
        var logs = new LogsClass( config.paths.drivers, logsConfig );
        logs.start( {
            id: utils.uniqueId(),
            ip: req.socket.remoteAddress,
            route: req.url,
            agent: req.headers[ 'User-Agent' ],
            timestamp: ( new Date() ).getTime()
        } );
        req.logs = logs;

        done();
    };

};
