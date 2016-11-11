'use strict'

var utils = require( __dirname + '/../utils' )

function Config ( config ) {
  config = ( config instanceof Config ) ? config.get() : config

  var defaults = {
    paths: {
      routes: null,
      drivers: null
    },
    errors: {},
    rewrite: function ( url ) {
      return url
    },
    httpsOptions: null
  }
  var configuration = utils.extend( {}, defaults, config )

  this.get = function ( prop ) {
    if ( prop ) {
      return configuration[ prop ]
    }
    return configuration
  }
}

module.exports = Config
