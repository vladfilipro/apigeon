'use strict'

class RouteClass {

  constructor ( config, request, connection ) {
    this.config = config
    this.request = request
    this.connection = connection
    this.middlewares = []
  }

  setup ( done ) {
    done()
  }

  hasAccess () {
    return new Promise( ( resolve, reject ) => {
      resolve()
    } )
  }

  methodAllowed ( method ) {
    return true
  }

  protocolAllowed ( protocol ) {
    return true
  }

  terminate () {}

}

module.exports = RouteClass
