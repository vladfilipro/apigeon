'use strict';

var utils = require( __dirname + '/../utils' );
var QueryBuilder = require( __dirname + '/queryBuilder' );

module.exports = function Logs( driversPath, config ) {

    var data = {};

    var dbDriver = utils.getFile( config.driver, [ driversPath, __dirname + '/../drivers' ] );

    this.set = function ( newData ) {
        if ( typeof newData === 'object' ) {
            data = newData;
        }
    };

    this.log = function ( info, cb ) {
        var qb = new QueryBuilder( dbDriver );
        qb.table( config.table );
        qb
            .insert( utils.merge( {}, data, info ) )
            .execute( function ( err ) {
                if ( err ) {
                    utils.log( 'Log creation error: ', err );
                    if ( typeof cb === 'function' ) {
                        cb( false );
                    }
                    return;
                }
                if ( typeof cb === 'function' ) {
                    cb( true );
                }
            } );
    };

};
