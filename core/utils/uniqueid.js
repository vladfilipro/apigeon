'use strict'

module.exports = function () {
  return ( new Date() ).getTime() + '' + Math.floor( Math.random() * 10000000 )
}
