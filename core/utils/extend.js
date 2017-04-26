'use strict'

let isObject = ( o ) => !Array.isArray( o ) && o !== null && typeof o === 'object'

let extend = ( o1, o2 ) => {
  if ( isObject( o1 ) && isObject( o2 ) ) {
    Object.keys( Object.assign( {}, o1, o2 ) ).forEach( ( key ) => {
      o1[key] = extend( o1[key], o2[key] )
    } )
  } else if ( o2 !== undefined ) {
    return o2
  }
  return o1
}

module.exports = extend
