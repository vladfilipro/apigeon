'use strict';

var utils = require( __dirname + '/../utils' );
var LogsClass = require( __dirname + '/../libs/logsClass' );

module.exports = function ( pathDrivers, config ) {
    return function ( req, res, next ) {

        // Initialize logging
        var logs = new LogsClass( pathDrivers, config );
        logs.set( {
            id: utils.uniqueId(),
            ip: req.ip,
            route: req.route,
            agent: req.header( 'User-Agent' )
        } );
        req.logs = logs;
        next();
    };
};
