# Apigeon

An npm plugin to generate a server application. It can be used with either standard http requests or websockets.

## Installation
```
npm install apigeon
```

## Usage
A basic example of how to use Apigeon. The `httpRoutesPath` and `socketRoutesPath` should point to the folder containing the route classes.

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

## API

Class | Api documentation
--- | ---
Apigeon | [https://github.com/vladfilipro/apigeon/blob/master/docs/apigeon.md](https://github.com/vladfilipro/apigeon/blob/master/docs/apigeon.md)
ConnectionClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/connection.md](https://github.com/vladfilipro/apigeon/blob/master/docs/connection.md)
ErrorClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/error.md](https://github.com/vladfilipro/apigeon/blob/master/docs/error.md)
RouteClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/route.md](https://github.com/vladfilipro/apigeon/blob/master/docs/route.md)
HttpRouteClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/httproute.md](https://github.com/vladfilipro/apigeon/blob/master/docs/httproute.md)
SocketRouteClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/socketroute.md](https://github.com/vladfilipro/apigeon/blob/master/docs/socketroute.md)

## Examples

In order to run the examples provided with the package, clone the repository found in [github](https://github.com/vladfilipro/apigeon.git), and then run the following commands:

```
npm install

npm test
```

---

#### A complete example:

- Create a folder: /home/user/apigeon

- Inside the folder run:

```
npm install apigeon
```

- HttpRoute file: /home/user/apigeon/routes/index.js

```
'use strict'

const Apigeon = require( 'apigeon' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb, ecb ) {
    if ( this.request.apigeon.query.message === 'hello') {
        cb( 'Hello!', 200, {} )
    } else if ( this.request.apigeon.query.message === 'redirect' ) {
        cb( 'You will be redirected...', 302, { 'Location': 'https://github.com' } )
    } else {
        ecb( new Apigeon.classes.ErrorClass( 403 ) )
    }
  }

}
```

- Main file: /home/user/apigeon/server.js

```

'use strict'

const PORT = 8080

const Apigeon = require( 'apigeon' )

let config = {
  httpRoutesPath: __dirname + '/routes',
  mode: {
      socket: false
  }
}

let server = new Apigeon( config )

server.start( PORT )

```

- To test the example:

```
node server.js
```

- Navigate to :
 - http://localhost:8080 - you should get a 500 error
 - http://localhost:8080/?message=hello - you should get a text "Hello!"
 - http://localhost:8080/?message=redirect - you should be taken to github
