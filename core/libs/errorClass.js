'use strict'

var messages = {
  '403': 'Access denied.',
  '404': 'Page not found.',
  '405': 'Method not allowed.',
  '500': 'There was an error.',
  '501': 'Not Implemented.'
}

module.exports = function ( code, errorMessage ) {
  var statusCode = code
  var message = errorMessage

  this.getCode = function () {
    return statusCode
  }

  this.getMessage = function () {
    var output = {
      error: {
        code: statusCode,
        message: message
      }
    }
    if ( !message ) {
      output.error.message = messages[ statusCode ]
    } else {
      output.error.message = message
    }
    return JSON.stringify( output )
  }
}
