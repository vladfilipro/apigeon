'use strict';
var env = process.env.NODE_ENV || 'development';
module.exports = {
    isDevelopment: function () {
        return !( env.toLowerCase() === 'production' || env.toLowerCase() === 'prod' );
    },
    isProduction: function () {
        return ( env.toLowerCase() === 'production' || env.toLowerCase() === 'prod' );
    },
    get: function () {
        return env;
    }
};
