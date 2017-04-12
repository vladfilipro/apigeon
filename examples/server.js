'use strict'

const PORT = 8080

const Apigeon = require( './../core' )

let server = new Apigeon( {
  routesPath: __dirname + '/routes'
} )

server.start( PORT, () => {
  console.log( 'Server started on port ' + PORT )
} )
