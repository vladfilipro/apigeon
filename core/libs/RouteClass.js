'use strict'

class RouteClass {
  constructor ( request ) {
    this.request = request
    this.middlewares = []
  }

  setup ( done ) {
    done()
  }

  terminate () {}
}

module.exports = RouteClass
