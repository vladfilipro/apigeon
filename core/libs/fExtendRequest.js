'use strict'

const url = require( 'url' )

module.exports = ( req ) => {
  let location = url.parse( req.url, true )
  req.pathname = location.pathname
  req.method = req.method
  req.protocol = req.protocol || ( req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' ) )
  req.query = location.query || {}
  return req
}
