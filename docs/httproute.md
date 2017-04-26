# HttpRouteClass

This class extends [RouteClass](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)
A SocketRoute only accepts the method `GET`, `POST`, `PUT` or `DELETE` ( unless the `methodAllowed` is overwritten ).


Property | Description
--- | ---
this.middlewares | An array of middlewares. These middlewares have to be set in the `setup( done )` method of the route and will be executed before the `hasAccess()` method. It's important to rember that the middlewares cannot send any data to the response object, because not all headers have been sent yet.

---

Method | Description | Return
--- | --- | ---
execute( callback, errorCallback ) | The execution function for the route | -

This method is called once all the checks for the route have passed.

- The `callback` parameter is a function which accepts three parameters:
 - data - type String - Contains the message to return to the client
 - code - type Integer - Contains the status code of the response ( default 200 )
 - headers - type Object - Contains an object representing the headers to return ( eg. Set-Cookie, Location, etc ) ( default {} )
- The `errorCallback` parameter is a function which accepts one parameter of type [ErrorClass](https://github.com/vladfilipro/apigeon/blob/master/docs/error.md). This will send the error provided to the client and terminate the connection.

---

### Example:

The following example describes an HttpRoute which returns a 500 error

```

'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  setup( done ) {
      // Adding a middleware
      this.middlewares.push( ( req, res, cb ) => {
          // Do something
          cb ( done )
      } )
  }

  execute ( cb, ecb ) {
    if ( this.request.apigeon.query.message === 'hello') {
        cb( 'Hello!', 200, {} )
    } else if ( this.request.apigeon.query.message === 'redirect' ) {
        cb( 'You will be redirected...', 302, { 'Location': 'http://vladfilip.ro' } )
    } else {
        ecb( new Apigeon.classes.ErrorClass( 403 ) )
    }
  }

}

```
