# Apigeon class

Every request that goes through Apigeon is altered by adding some additional properties:

```
    pathname: location.pathname, // Parsed pathname of from the processed url
    method: req.method, // The http method or 'SOCKET' if accessing a SocketRoute
    protocol: req.protocol || ( req.headers[ 'X-Forwarded-Proto' ] ? req.headers[ 'X-Forwarded-Proto' ] : ( ( req.socket.encrypted ) ? 'https' : 'http' ) ),
    query: location.query || {} // Object containing the query string parameters,
```

Method | Description | Return
--- | --- | ---
constructor( configuration ) |  The Apigeon application constructor | -

- See the configuration section below for details on how to instantiate Apigeon

- Configuration:

```
{
  // A function for processing urls before the http classes are executed.
  httpRoutes: ( url ) => {
    let urlParts = Url.parse( url )
    return require( __dirname + '/routes/http' + urlParts.pathname )
  },
  // A function for processing urls before the socket classes are executed.
  socketRoutes: ( url ) => {
    let urlParts = Url.parse( url )
    return require( __dirname + '/routes/socket' + urlParts.pathname )
  },
  mode: {
    http: true, // Enable http mode
    socket: true // Enable socket mode
  },

  // An HttpServer instance. If left empty or null
  // a server instance will be created by the application
  // See https://nodejs.org/api/http.html
  server: null,

  // Server timeout is a shorthand for HttpServer.timeout
  timeout: 120000
}
```

---

Method | Description | Return
--- | --- | ---
start( port, cb ) | Starts the webserver | -

The start method is used to make the server start listening for connections on the described port

- The `port` parameter is the port for the server
- The `cb` parameter is a function that will be called once the server starts ( optional )

---

Method | Description | Return
--- | --- | ---
stop( cb ) | Stops the webserver  | -

The stop method is used to make the server stop listening for connections

- The `cb` parameter is a function that will be called once the server stops ( optional )

---

Method | Description | Return
--- | --- | ---
static classes() | returns an object containing public classes that are needed in route creation | Object

The classes method returns an object containing public classes that are needed in route creation:


 - HttpRouteClass
 - SocketRouteClass

---

### Example:

```
'use strict'

const Url = require( 'url' )
const Apigeon = require( 'apigeon' )

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

```
