# SocketRouteClass

This class extends [RouteClass](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)

---
Note that the SocketMiddleware has the following interface:
`function( socket, req, callback )`

---

Method | Description | Return
--- | --- | ---
execute( callback, errorCallback ) | The execution function for the route | -

This method is called once all the checks for the route have passed.

- The `callback` parameter is a function which accepts one parameter of type `String`, containing the response from the server
- The `errorCallback` parameter is a function which accepts one parameter of type `String` which contains a final message and will terminate the connection.

---

Method | Description | Return
--- | --- | ---
onmessage( data, callback, errorCallback ) | The message function for the route | -

This method is called each time a message is received.

- The `data` parameter contains the data sent by the client
- The `callback` parameter is a function which accepts one parameter of type `String`, containing the response from the server
- The `errorCallback` parameter is a function which accepts one parameter of type `String` which contains a final message and will terminate the connection.

---

### Example:

The following example describes an SocketRoute

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {

  setup( done ) {
    // Adding a middleware
    this.middlewares.push( ( socket, req, cb ) => {
        // Do something
        cb ( done )
    } )
  }

  onmessage ( data, cb, ecb ) {
    if ( data === 'Hello World!') {
        cb( 'Hello to you too!' )
    } else {
        ecb()
    }
  }

  execute ( cb, ecb ) {
      cb( 'Connected' )
  }

}

```
