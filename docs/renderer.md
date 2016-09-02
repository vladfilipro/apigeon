# Apigeon#Renderer

A renderer specifies how data is sent to the client. It is directly affected by they `Accepts` header sent with the request. The built-in renderers available are:

Renderer               | Output description
---------------------- | ------------------------------------------------------------
text/plain             | if !(`string`, `number`, `null`) then JSON.stringify( data )
                       | else if `undefined` then `empty`
                       | else then data.toString();
text/html              | if !(`string`, `number`, `null`) then JSON.stringify( data )
                       | else if `undefined` then ''
                       | else then data.toString();
application/json       | if `object` then JSON.stringify( data )
                       | else then data;
application/javascript | if !(`string`, `number`, `null`) then `empty`
                       | else then data.toString();
empty                  | returns `empty`

You can also create your own renderer, or replace an existing renderer. Renderers used are taken from either `Configuration.paths.renderers` folder or the internal ones (defined above).

## How renderers works

- Simply put, whatever the callback function from the `Route.execute` method outputs, will be sent to the renderer function.
- It is very important to understand the logic Apigeon uses in choosing the renderer for each route.

### Example:

Overwrite `text/html` renderer to return a header for each route.

1. Create a file called `text-html.js` in your renderers folder ( you can specify a renderers folder through the Apigeon constructor ).

  ```
   'use strict';

   module.exports = function ( data ) {
       // Alter data sent from the route
       return 'Server response: ' + data.toString();
   };
  ```

2. Set the renderers folder

  ```
   var apigeon = new Apigeon( {
       paths: {
           renderers: './myRenderers' // The path to the folder where text-html.js is located
       }
   } )
  ```
