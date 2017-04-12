'use strict'

const utils = require( __dirname + '/../utils' )

class ConfigClass {

  constructor ( config ) {
    this.data = utils.extend( {
      routesPath: null,
      mode: {
        rest: true,
        ws: true
      },
      httpErrors: {
        '403': 'Access denied.',
        '404': 'Page not found.',
        '405': 'Method not allowed.',
        '500': 'There was an error.',
        '501': 'Not Implemented.'
      },
      rewrite: ( url ) => {
        return url
      },
      httpsOptions: null
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
