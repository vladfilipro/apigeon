# ErrorClass

This error class provides a way to create http error messages

Method | Description | Return
--- | --- | ---
constructor( code, message ) | The error message constructor | -

- The `code` parameter is used as an HTTP status code response in httpRoutes
- The `message` parameter contains the text to be displayed to the user ( optional )

---

Method | Description | Return
--- | --- | ---
getCode() |  Returns the code of the error | String

This method is used to retrieve the code of the error instance

---

Method | Description | Return
--- | --- | ---
getMessage() |  Returns the message of the error | String

This method is used to retrieve the message of the error instance

---

### Predefined errors

The class has a few http errors already configured, they can be used by providing an undefined message to the class constructor.

Predefined error codes | Predefined Message
--- | ---
403 | Access denied.
404 | Page not found.
405 | Method not allowed.
500 | There was an error.
501 | Not Implemented.

---

### Example:

The following example describes an HttpRoute which returns a 500 error

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb, ecb ) {
    ecb( new Apigeon.classes.ErrorClass( 500 ) )
  }

}

```
