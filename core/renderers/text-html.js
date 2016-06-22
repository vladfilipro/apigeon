'use strict';

module.exports = function ( data ) {
    var output = '<table width="100%" border="1">';
    for ( var key in data ) {
        if ( data.hasOwnProperty( key ) ) {
            output += '<tr>';
            output += '<td>' + key + '</td>';
            output += '<td>' + JSON.stringify( data[ key ] ) + '</td>';
            output += '</tr>';
        }
    }
    output += '</table>';
    return output;
};
