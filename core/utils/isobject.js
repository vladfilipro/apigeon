'use strict'

module.exports = ( o ) => !Array.isArray( o ) && o !== null && typeof o === 'object'
