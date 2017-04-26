'use strict'

class RouteClass {

  constructor ( config, request, connection ) {
    this.config = config
    this.request = request
    this.connection = connection
  }

  setup ( done ) {
    done()
  }

  hasAccess () {
    return true
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
