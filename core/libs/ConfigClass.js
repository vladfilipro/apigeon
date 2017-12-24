'use strict'

const utils = require( __dirname + '/../utils' )

class ConfigClass {
  constructor ( config ) {
    this.data = utils.extend( {
      mode: {
        http: false,
        socket: false
      },
      httpRoutes: () => null,
      socketRoutes: () => null,
      server: null,
      timeout: 120000,
      maxPayload: 2048
    }, ( config instanceof ConfigClass ) ? config.get() : config )
  }

  get ( prop ) {
    if ( prop ) {
      return this.data[ prop ]
    }
    return this.data
  }
}

module.exports = ConfigClass
