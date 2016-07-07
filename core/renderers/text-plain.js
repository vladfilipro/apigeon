'use strict';

module.exports = function ( data ) {
    if ( data === undefined ) {
        return '';
    }
    if ( [ 'string', 'number', 'null' ].indexOf( typeof data ) === -1 ) {
        return JSON.stringify( data );
    }
    return data.toString();
};
