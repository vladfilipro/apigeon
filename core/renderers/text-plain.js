'use strict';

module.exports = function ( data ) {
    if ( [ 'string', 'number', 'null' ].indexOf( typeof data ) === -1 ) {
        return '';
    }
    return data.toString();
};
