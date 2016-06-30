'use strict';

var extend = function ( a, b ) {
    if ( typeof b === 'object' ) {
        for ( var prop in b ) {
            if ( b.hasOwnProperty( prop ) ) {
                if ( typeof a[ prop ] === 'object' ) {
                    a[ prop ] = extend( a[ prop ], b[ prop ] );
                } else {
                    a[ prop ] = b[ prop ];
                }
            }
        }
    } else {
        a = b;
    }
    return a;
};

module.exports = function () {
    var target = arguments[ 0 ];
    var extensions = [];
    for ( var params in arguments ) {
        if ( arguments.hasOwnProperty( params ) && params !== 0 && arguments[ params ] ) {
            extensions.push( arguments[ params ] );
        }
    }

    for ( var i = 0; i < extensions.length; i++ ) {
        target = extend( target, extensions[ i ] );
    }

    return target;
};
