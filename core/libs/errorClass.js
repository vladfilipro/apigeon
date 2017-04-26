'use strict'

const errors = {
  '403': 'Access denied.',
  '404': 'Page not found.',
  '405': 'Method not allowed.',
  '500': 'There was an error.',
  '501': 'Not Implemented.'
}

class ErrorClass {

  constructor ( code, message ) {
    this.code = code || 0
    this.message = message || errors[ this.code ] || null
  }

  getCode () {
    return this.code
  }

  getMessage () {
    return this.message
  }

}

module.exports = ErrorClass
