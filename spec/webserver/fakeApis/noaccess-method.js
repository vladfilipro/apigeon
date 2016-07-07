'use strict';

module.exports = function () {

    this.methodAllowed = function ( method ) {
        return [ 'GET' ].indexOf( method.toUpperCase() ) !== -1;
    };

    this.execute = function ( req, cb ) {
        cb( {
            name: 'Hello'
        } );
    };

};
