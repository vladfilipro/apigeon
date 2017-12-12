'use strict'

const Url = require( 'url' )
const Apigeon = require( './../core' )

const PORT = 8080

let server = new Apigeon( {
  mode: {
    http: true,
    socket: true
  },
  httpRoutes: ( url ) => {
    let urlParts = Url.parse( url )
    return require( __dirname + '/routes/http' + urlParts.pathname )
  },
  socketRoutes: ( url ) => {
    let urlParts = Url.parse( url )
    return require( __dirname + '/routes/socket' + urlParts.pathname )
  }
} )

server.start( PORT )
