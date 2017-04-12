'use strict'

class LoggerClass {

  constructor ( debug ) {
    this.debug = ( debug === undefined ) ? true : !!debug
  }

  log () {
    if ( this.debug ) {
      console.log.apply( null, arguments )
    }
  }

  warn () {
    if ( this.debug ) {
      console.warn.apply( null, arguments )
    }
  }

  error () {
    if ( this.debug ) {
      console.error.apply( null, arguments )
    }
  }
}

module.exports = LoggerClass
