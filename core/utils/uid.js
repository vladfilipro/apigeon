'use strict'

module.exports = () => {
  return ( new Date() ).getTime() + '' + Math.floor( Math.random() * 10000000 )
}
