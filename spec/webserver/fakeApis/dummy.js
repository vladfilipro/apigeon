'use strict';

module.exports = function () {

    var ErrorClass = this.Error;
    var fail = new ErrorClass( 500 );

    this.execute = function ( req, cb, ecb ) {
        if ( req.query.bad ) {
            ecb( fail );
            return;
        }
        cb( 'Hello' );
    };

    this.terminate = function () {
        global[ 'terminated_api' ] = true;
    };

};
