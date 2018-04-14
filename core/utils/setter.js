'use strict'

const isObject = require( __dirname + '/isobject' )

let setValueForObject = ( keys, value, collection ) => {
  let key = keys.shift()

  if ( keys.length === 0 ) {
    collection[ key ] = value
  } else {
    if ( !isObject( collection[ key ] ) ) {
      collection[ key ] = {}
    }
    setValueForObject( keys, value, collection[ key ] )
  }
}

module.exports = ( key, value, collection ) => {
  if ( typeof key === 'string' && isObject( collection ) ) {
    if ( key === '' ) {
      collection = value
      return
    }
    setValueForObject( key.split( '.' ), value, collection )
  }
}
