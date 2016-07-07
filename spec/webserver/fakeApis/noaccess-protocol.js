'use strict';

module.exports = function () {

    this.protocolAllowed = function ( protocol ) {
        return [ 'HTTP' ].indexOf( protocol.toUpperCase() ) === -1;
    };

    this.execute = function ( req, cb ) {
        cb( {
            name: 'Hello'
        } );
    };

};
