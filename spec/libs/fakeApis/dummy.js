'use strict';

module.exports = function () {

    var ErrorClass = this.Error;
    var fail = new ErrorClass( 500 );

    this.execute = function ( req, cb, ecb ) {
        if ( req.bad ) {
            ecb( fail );
            return;
        }
        if ( req.good ) {
            cb( 'good' );
            return;
        }
        if ( req.code ) {
            cb( 'good', 100 );
            return;
        }
    };

};
