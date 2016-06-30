'use strict';

var getEnv = function () {
    var env = ( process.env.NODE_ENV && process.env.NODE_ENV !== 'undefined' ) ? process.env.NODE_ENV : 'development';
    return env.toLowerCase();
};

module.exports = {
    isDevelopment: function () {
        return !( getEnv() === 'production' || getEnv() === 'prod' );
    },
    isProduction: function () {
        return ( getEnv() === 'production' || getEnv() === 'prod' );
    },
    get: function () {
        return getEnv();
    }
};
