# Apigeon class

Method | Description | Return
--- | --- | ---
constructor( configuration ) |  The Apigeon application constructor | -

- See the configuration section below for details on how to instantiate Apigeon

- Configuration:

```
{
  httpRoutesPath: __dirname + '/routes/http', // Path to http routes folder
  socketRoutesPath: __dirname + '/routes/socket', // Path to socket routes folder
  mode: {
    http: true, // Enable http mode
    socket: true // Enable socket mode
  },

  // An HttpServer instance. If left empty or null
  // a server instance will be created by the application
  // See https://nodejs.org/api/http.html
  server: null,

  // A function for processing urls before they are executed.
  // Can be used like mod_rewrite
  rewrite: ( url ) => {
    return url
  },

  // This object will be passed to the server create method
  // ( if the `server` property is null ) in order to create
  // an https server. See https://nodejs.org/api/https.html
  httpsOptions: null
}
```

---

Method | Description | Return
--- | --- | ---
start( port, cb ) | Starts the webserver | -

The start method is used to make the server start listening for connections on the described port

- The `port` parameter is the port for the http server
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
 - ErrorClass
 - CookieClass

---

### Example:

```
'use strict'

const PORT = 8080

const Apigeon = require( 'apigeon' )

let config = {
  httpRoutesPath: __dirname + '/routes/http',
  socketRoutesPath: __dirname + '/routes/socket'
}

let server = new Apigeon( config )

server.start( PORT )

```
