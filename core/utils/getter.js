'use strict'

const isObject = require( __dirname + '/isobject' )

let getValueFromObject = ( keys, collection ) => {
  let key = keys.shift()

  if ( keys.length === 0 ) {
    return collection[ key ]
  } else {
    if ( isObject( collection[ key ] ) ) {
      return getValueFromObject( keys, collection[ key ] )
    }
  }
}

module.exports = ( key, collection ) => {
  if ( typeof key === 'string' && isObject( collection ) ) {
    if ( key === '' ) {
      return collection
    }
    return getValueFromObject( key.split( '.' ), collection )
  }
}
