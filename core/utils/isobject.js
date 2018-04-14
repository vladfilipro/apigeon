'use strict'

module.exports = o => !Array.isArray( o ) && o !== null && typeof o === 'object' && Object.prototype.toString.call( o ) === '[object Object]'
