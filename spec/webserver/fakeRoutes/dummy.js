'use strict';

module.exports = function () {

    var ErrorClass = this.Error;
    var fail = new ErrorClass( 500 );

    this.execute = function ( req, cb, ecb ) {
        if ( req.query.bad || req.body === 'bad' ) {
            ecb( fail );
            return;
        }
        cb( 'Hello' );
    };

    this.terminate = function () {
        global[ 'terminated_route' ] = true;
    };

};
