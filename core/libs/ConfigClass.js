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
      socketMaxPayload: 2048,
      socketAuthorization: null
    }, ( config instanceof ConfigClass ) ? config.get() : config )
  }

  set ( key, value ) {
    utils.setter( key, value, this.data )
    return this
  }
  get ( key ) {
    return utils.getter( key, this.data )
  }
}

module.exports = ConfigClass
