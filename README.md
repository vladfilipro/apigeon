# Apigeon

[![Dependency Status][depstat-image]][depstat-url]

[depstat-url]: https://david-dm.org/vladfilipro/apigeon
[depstat-image]: https://david-dm.org/vladfilipro/apigeon.png

An npm plugin to generate a server application. It can be used with either standard http requests or websockets.

## Installation
```
npm install apigeon
```

## Usage
A basic example of how to use Apigeon.

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

```

---

- To test the examples:

```
node test
```

- Navigate to :
 - http://localhost:8080 - you should get a 500 error
 - http://localhost:8080/?message=hello - you should get a text "Hello!"
 - http://localhost:8080/?message=redirect - you should be taken to github
