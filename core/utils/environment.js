'use strict'

let getEnv = () => {
  let env = ( process.env.NODE_ENV && process.env.NODE_ENV !== 'undefined' ) ? process.env.NODE_ENV : 'development'
  return env.toLowerCase()
}

module.exports = {
  isDevelopment: () => {
    return !( getEnv() === 'production' || getEnv() === 'prod' )
  },
  isProduction: () => {
    return ( getEnv() === 'production' || getEnv() === 'prod' )
  },
  get: () => {
    return getEnv()
  }
}
