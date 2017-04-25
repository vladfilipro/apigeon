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
ErrorClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/error.md](https://github.com/vladfilipro/apigeon/blob/master/docs/error.md)
CookieClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/cookie.md](https://github.com/vladfilipro/apigeon/blob/master/docs/cookie.md)
HttpRouteClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/httproute.md](https://github.com/vladfilipro/apigeon/blob/master/docs/httproute.md)
SocketRouteClass | [https://github.com/vladfilipro/apigeon/blob/master/docs/socketroute.md](https://github.com/vladfilipro/apigeon/blob/master/docs/socketroute.md)

## Examples

In order to run the examples provided with the package, clone the repository found in [github](https://github.com/vladfilipro/apigeon.git), and then run the following commands:

```
npm install

npm test
```
