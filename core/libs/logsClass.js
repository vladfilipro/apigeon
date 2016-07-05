'use strict';

var utils = require( __dirname + '/../utils' );

module.exports = function Logs( driversPath, config ) {

    var data = {};

    var dbDriver = utils.getFile( config.driver, [ driversPath, __dirname + '/../drivers' ] );

    this.start = function ( newData ) {
        if ( typeof newData === 'object' ) {
            data = newData;
        }
    };

    var respond = function ( cb, outcome ) {
        if ( typeof cb === 'function' ) {
            cb( outcome );
        }
    };

    this.log = function ( info, cb ) {
        var id = utils.uniqueId();
        dbDriver.insert( config.table, id, utils.merge( {}, data, info ), function ( err ) {
            if ( err ) {
                utils.log( 'Log creation error: ', err );
                respond( cb, false );
                return;
            }
            respond( cb, id );
        } );
    };

};
