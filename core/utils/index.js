'use strict'

module.exports = {
  environment: require( __dirname + '/environment' ),
  extend: require( __dirname + '/extend' ),
  isObject: ( o ) => !Array.isArray( o ) && o !== null && typeof o === 'object',
  load: require( __dirname + '/load' ),
  logger: require( __dirname + '/logger' ),
  uid: require( __dirname + '/uid' )
}
