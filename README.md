# Apigeon

An npm plugin to generate an server application. It can be used with either standard http requests or websockets.

## Basic usage

First step is always to install apigeon:

```
    npm install apigeon
```

A basic example involves creating a simple route, and starting the server

### Simple route example

Create a folder `routes` and inside file called `index.js`. Add this code to the `index.js` file.

```
module.exports = function () {

    this.execute = function ( req, cb ) {
        cb( 'Hello World!' );
    };

};
```

NOTE: The structure of the `routes` folder determines the url required to access it.

```
+routes                   | not accessible by url
    /index.js             | http://example.com/
    +users                | not accessible by url
        /index.js         | http://example.com/users
        /create.js        | http://example.com/users/create
```

### Creating a REST server

Once your routes are defined, in your route folder, create a file `server.js` with the following content

```
    'use strict';

    var Apigeon = require( 'apigeon' );


    // Define server
    var apigeon = new Apigeon( {
        paths: {
            routes: './routes'
        }
    } );

    apigeon.enableREST();

    var port = 8000;
    apigeon.start( port, function() {
        console.log('Server listening on port ' + port);
    });
```

To test your server run `node server.js`. At this point you can reach the routes you created by using the correct urls.
