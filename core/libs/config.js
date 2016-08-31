'use strict';

var utils = require( __dirname + '/../utils' );

function Config( config ) {

    config = ( config instanceof Config ) ? config.get() : config;

    var configuration = utils.extend( {}, {
        paths: {
            apis: null,
            drivers: null,
            renderers: null
        },
        errors: {},
        rewrite: function ( url ) {
            return url;
        },
        httpsOptions: null
    }, config );

    this.get = function ( prop ) {
        if ( prop ) {
            return configuration[ prop ];
        }
        return configuration;
    };
}

module.exports = Config;
