'use strict';

var zeroFill = function ( number, digits ) {
    if ( digits ) {
        var result = '';
        for ( var i = 1; i <= digits; i++ ) {
            result = '' + ( number % 10 ) + result;
            number = Math.floor( number / 10 );
        }
        number = result;
    }
    return number;
};

var formatDate = function ( date ) {
    return date.getFullYear() + '-' + zeroFill( date.getMonth() + 1, 2 ) + '-' + zeroFill( date.getDate(), 2 );
};
var formatTime = function ( date ) {
    return zeroFill( date.getHours(), 2 ) + ':' + zeroFill( date.getMinutes(), 2 ) + ':' + zeroFill( date.getSeconds(), 2 ) + '.' + zeroFill( date.getMilliseconds(), 3 );
};

module.exports = {
    now: function () {
        return Date.now();
    },
    datetime: function () {
        var date = new Date();
        return formatDate( date ) + ' ' + formatTime( date );
    },
    json: function () {
        var date = new Date();
        return date.toJSON();
    }
};
