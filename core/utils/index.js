'use strict'

module.exports = {
  DateTime: require( __dirname + '/DateTimeClass' ),
  environment: require( __dirname + '/environment' ),
  extend: require( __dirname + '/extend' ),
  isObject: ( o ) => !Array.isArray( o ) && o !== null && typeof o === 'object',
  load: require( __dirname + '/load' ),
  LoggerClass: require( __dirname + '/LoggerClass' ),
  uid: require( __dirname + '/uid' )
}
