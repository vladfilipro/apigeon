'use strict'

class ErrorClass {

  constructor ( code, message ) {
    this.code = code || 0
    this.message = message || null
  }

  getCode () {
    return this.code
  }

  getMessage () {
    return this.message
  }

}

module.exports = ErrorClass
