# HttpRouteClass

This class extends [RouteClass](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)

---

Note that the HttpMiddleware has the following interface:
`function( req, res, callback )`

---

Method | Description | Return
--- | --- | ---
execute( callback, errorCallback ) | The execution function for the route | -

This method is called once all the checks for the route have passed.

- The `callback` parameter is a function which accepts three parameters:
 - data - type String - Contains the message to return to the client
 - code - type Integer - Contains the status code of the response ( default 200 )
 - headers - type Object - Contains an object representing the headers to return ( eg. Set-Cookie, Location, etc ) ( default {} )

---

### Example:

The following example describes an HttpRoute

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
    if ( this.request.query.message === 'hello') {
        cb( 'Hello!', 200, {} )
    } else if ( this.request.query.message === 'redirect' ) {
        cb( 'You will be redirected...', 302, { 'Location': 'http://vladfilip.ro' } )
    } else {
        cb( null, 403 )
    }
  }

}

```
