'use strict';

var url = require( 'url' );

module.exports = function () {

    var ErrorClass = this.Error;
    var fail = new ErrorClass( 500 );

    this.execute = function ( req, cb, ecb ) {
        var location = url.parse( req.url, true );
        req.query = location.query;
        if ( req.query.bad || req.body === 'bad' ) {
            ecb( fail );
            return;
        }
        cb( 'Hello' );
    };

    this.terminate = function () {
        global[ 'terminated_api' ] = true;
    };

};
