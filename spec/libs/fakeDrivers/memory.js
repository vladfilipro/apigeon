'use strict';

module.exports = {
    'insert': function ( table, id, data, cb ) {
        cb( 'error', null );
    },
    'update': function ( table, id, data, cb ) {
        cb( 'error', null );
    },
    'select': function ( table, id, cb ) {
        cb( 'error', null );
    },
    'error': function ( table, id, cb ) {
        cb( 'error', null );
    }
};
