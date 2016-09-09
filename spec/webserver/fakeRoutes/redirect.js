'use strict';

module.exports = function () {

    this.execute = function ( req, cb ) {
        cb( 'File was moved.', 301, {
            'Location': 'http://fake.com'
        } );
    };

};
