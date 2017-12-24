# SocketRouteClass

This class extends [RouteClass](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)

---
Note that the SocketMiddleware has the following interface:
`function( req, end, callback )`

- The `end` function accepts one parameter, which is the status code to return. The `end()` function should be called if the connection should never be established.

---

Method | Description | Return
--- | --- | ---
execute( callback, end ) | The execution function for the route | -

This method is called once all the checks for the route have passed.

- The `callback` parameter is a function which accepts one parameter of type `String`, containing the response from the server
- The `end` parameter is a function which will terminate the connection. Unlike the end method in the middlewares, the method in `execute` does not accept a parameter

---

Method | Description | Return
--- | --- | ---
onmessage( data, callback, end ) | The message function for the route | -

This method is called each time a message is received.

- The `data` parameter contains the data sent by the client
- The `callback` parameter is a function which accepts one parameter of type `String`, containing the response from the server
- The `end` parameter is a function which will terminate the connection. Unlike the end method in the middlewares, the method in `onmessage` does not accept a parameter

---

### Example:

The following example describes an SocketRoute

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {

  setup( done ) {
    // Adding a middleware
    this.middlewares.push( ( req, end, cb ) => {
        // Do something
        cb ( done )
    } )
  }

  onmessage ( data, cb, end ) {
    if ( data === 'Hello World!') {
        cb( 'Hello to you too!' )
    } else {
        end()
    }
  }

  execute ( cb, end ) {
      cb( 'Connected' )
  }

}

```
