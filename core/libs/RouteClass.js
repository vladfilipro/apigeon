'use strict'

class RouteClass {
  constructor ( request ) {
    this.request = request
    this.middlewares = []
  }

  setup ( done ) {
    done()
  }

  hasAccess ( resolve, reject ) {
    resolve()
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
