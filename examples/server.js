'use strict'

const PORT = 8080

const Apigeon = require( './../core' )

let server = new Apigeon( {
  httpRoutesPath: __dirname + '/routes/http',
  socketRoutesPath: __dirname + '/routes/socket'
} )

server.start( PORT )
