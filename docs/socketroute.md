# SocketRouteClass

This class extends [RouteClass](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)
A SocketRoute only accepts the method `SOCKET` ( unless the `methodAllowed` is overwritten ). The socket server will automatically set the method to `SOCKET` when sent to the route so you don't have to worry about that.

Method | Description | Return
--- | --- | ---
execute( data, callback, errorCallback ) | The execution function for the route | -

This method is called once all the checks for the route have passed.

- The `data` parameter contains the data sent by the client
- The `callback` parameter is a function which accepts one parameter of type `String`, containing the response from the server
- The `errorCallback` parameter is a function which accepts one parameter of type [ErrorClass](https://github.com/vladfilipro/apigeon/blob/master/docs/error.md). This will send the error provided to the client and terminate the connection.

---

### Example:

The following example describes an SocketRoute which returns a 500 error

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.SocketRouteClass {

  execute ( data, cb, ecb ) {
    if ( data === 'Hello World!') {
        cb( 'Hello to you too!' )
    } else {
        ecb( new Apigeon.classes.ErrorClass( 403 ) )
    }
  }

}
