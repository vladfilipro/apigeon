'use strict';

module.exports = function ( data ) {
    if ( typeof data === 'object' ) {
        return JSON.stringify( data );
    }
    return data;
};
