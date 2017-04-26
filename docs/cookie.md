# CookieClass

This cookie class provides an easy way of manipulating cookies

Property | Description | Default values
--- | --- | --
this.key | Name of cookie | -
this.value | Value of cookie | -
this.path | Cookie path | /
this.expires | Cookie expire date object | -
this.secure | A boolean value determining if the cookie is secure | false
this.httpOnly | A boolean value determining if the cookie has the httpOnly property | false

---

Method | Description | Return
--- | --- | ---
constructor( key, value, path, expires, secure, httpOnly ) | The cookie constructor | -

- The `key` parameter is the cookie name
- The `value` parameter is the cookie value
- The `path` parameter is the cookie path ( defaults '/' )( optional )
- The `expires` parameter is the cookie expire date and time ( javascript Date object )( optional )
- The `secure` parameter is the cookie secure status ( boolean, defaults false )( optional )
- The `httpOnly` parameter is the cookie httpOnly property ( boolean, defaults false )( optional )

---

Method | Description | Return
--- | --- | ---
static getCookiesFromHeader ( header ) |  Returns an array of CookieClass instances | Array

The method is used to parse the cookie header into CookieClass instances

- The `header` parameter is a string, representing the cookies header and is taken from the request object

---

Method | Description | Return
--- | --- | ---
toString () |  Returns the cookie in a string format | String

This method is used to convert the cookie into a string to be used for the response `Set-Cookie` header

---

### Example:

The following example describes an HttpRoute which returns a 500 error

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    let cookie = new Apigeon.classes.CookieClass( 'cookie1', 'myCookieValue' )
    cookie.expires = new Date( Date.now() + 3600 )

    cb( '', 302, {
      'Location': '/middleware',
      'Set-Cookie': cookie.toString()
    } )
  }

}
```
