'use strict';

var extend = function ( a, b ) {
    if ( typeof b === 'object' && b !== null ) {
        Object.keys( b ).forEach( function ( prop ) {
            a = a || {};
            if ( typeof a[ prop ] === 'object' ) {
                a[ prop ] = extend( a[ prop ], b[ prop ] );
            } else {
                a[ prop ] = b[ prop ];
            }
        } );
    }
    return a;
};

module.exports = function () {
    var target = arguments[ 0 ];
    var extensions = [];
    for ( var i = 1, params = Object.keys( arguments ), l = params.length; i < l; i++ ) {
        extensions.push( arguments[ params[ i ] ] );
    }
    for ( var j = 0; j < extensions.length; j++ ) {
        target = extend( target, extensions[ j ] );
    }

    return target;
};
