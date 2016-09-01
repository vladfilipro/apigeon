# Apigeon

An npm plugin to generate an API application. It can be used with either standard http requests or websockets.

[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

## Basic usage

First step is always to install apigeon:

```
    npm install apigeon
```

A basic example involves creating a simple route, and starting the server

### Simple route example

Create a folder `apis` and inside file called `index.js`. Add this code to the `index.js` file.

```
module.exports = function () {

    this.execute = function ( req, cb ) {
        cb( 'Hello World!' );
    };

};
```

NOTE: The structure of the `apis` folder determines the url required to access it.

```
+apis                     | not accessable by url
    /index.js             | http://example.com/
    +users                | not accessable by url
        /index.js         | http://example.com/users
        /create.js        | http://example.com/users/create
```

### Creating a REST server

Once your apis are defined, in your route folder, create a file `server.js` with the following content

```
    'use strict';

    var Apigeon = require( 'apigeon' );


    // Define server
    var apigeon = new Apigeon( {
        paths: {
            apis: './apis'
        }
    } );

    apigeon.enableREST();

    var port = 8000;
    apigeon.start( port, function() {
        console.log('Server listening on port ' + port);
    });
```

To test your server run `node server.js`. At this point you can reach the apis you created by using the correct urls.

### For additional information on how to use Apigeon, please refer to our [documentation](https://github.com/vladfilipro/apigeon/blob/master/docs/content.md).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[depstat-image]: https://david-dm.org/vladfilipro/apigeon.png
[depstat-url]: https://david-dm.org/vladfilipro/apigeon
[npm-image]: https://badge.fury.io/js/apigeon.png
[npm-url]: https://npmjs.org/package/apigeon
