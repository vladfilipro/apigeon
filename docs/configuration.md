# Apigeon#Configuration

Description of the configuration object passed to the Apigeon constructor. The configuration passed to the Apigeon instance determines how the server will work.

Example:

```
var config = {
    paths: {
        routes: './routes'
    }
};
var server = new Apigeon( config );
server.start( 8000 );
```

## Default values

```
{
    paths: {
        routes: null,
        drivers: null,
        renderers: null
    },
    errors: {},
    rewrite: function ( url ) {
        return url;
    },
    httpsOptions: null
}
```

## Description of properties

`paths` - `{ Object }` - The object determines the location of external files required by the server to run. It contains three properties:

- `routes` - A string containing the path to the folder containing your routes
- `drivers` - A string containing the path to the folder containing your drivers
- `renderers` - A string containing the path to the folder containing your renderers

`errors` - `{ Object }` - The object contains the error pages. Standard error pages defined are as follows:

Code | Description
---- | -------------------
403  | Access denied.
404  | Page not found.
405  | Method not allowed.
500  | There was an error.
502  | Not Implemented.

- You can add your own custom error and use them through the ErrorClass

`rewrite` - { Function } - This function will be applied to all url requests. The default function is defined as:

```
function( url ) {
    return url;
}
```

- This option is useful for manipulating differences between requested urls and interpreted urls. Similar to mod_rewrite in apache2

`httpOptions` - { Object } - Object containing configuration for https server. To get more information, please see the `options` parameter on [https.createServer](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)

- Default value of httpOptions is `null` which implies an http server will be used.
- NOTE: you cannot use an http and an https instance on the same apigeon instance. If both are needed, 2 instances of apigeon should be used.
