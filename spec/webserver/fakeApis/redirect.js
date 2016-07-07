'use strict';

module.exports = function () {

    this.execute = function ( req, cb ) {
        cb( 'http://fake.com', 301 );
    };

};
