'use strict';

module.exports = function () {

    this.execute = function ( req, cb ) {
        cb( {
            name: 'Hello'
        } );
    };
    this.getAcceptedRenderers = function () {
        return [ 'text/plain', 'application/json' ];
    };
};
