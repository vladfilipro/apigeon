'use strict';

module.exports = {
    insert: function ( table, primary, data, cb ) {
        global[ table ] = global[ table ] || {};

        if ( global[ table ][ primary ] ) {
            cb( 'Invalid primary key. Not unique', null );
            return;
        }

        var record = {};

        // We do not want to keep references, we want string values.
        Object.keys( data ).forEach( function ( key ) {
            record[ key ] = JSON.stringify( data[ key ] );
        } );

        global[ table ][ primary ] = record;
        cb( null, 'Values inserted into ' + table );
    },
    update: function ( table, primary, data, cb ) {
        global[ table ] = global[ table ] || {};

        if ( !global[ table ][ primary ] ) {
            cb( 'Primary key does not exist', null );
            return;
        }

        var record = global[ table ][ primary ];
        Object.keys( data ).forEach( function ( key ) {
            record[ key ] = JSON.stringify( data[ key ] );
        } );

        cb( null, 'Values updated for key ' + primary );
    },
    select: function ( table, primary, cb ) {
        global[ table ] = global[ table ] || {};

        if ( !global[ table ][ primary ] ) {
            cb( 'Primary key does not exist', null );
            return;
        }

        cb( null, global[ table ][ primary ] );
    },
    delete: function ( table, primary, cb ) {
        global[ table ] = global[ table ] || {};

        if ( !global[ table ][ primary ] ) {
            cb( 'Primary key does not exist', null );
            return;
        }

        delete global[ table ][ primary ];
        cb( null, 'Record with key ' + primary + ' deleted' );
    }
};
