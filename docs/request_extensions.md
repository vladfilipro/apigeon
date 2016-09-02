# Apigeon#Request Extensions

The standard [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) passed on to the routes, is always extended for easier access to common questions like query parameters, pathname, protocol, etc.

The properties added to the request object are as follows:

Property | Description                                                | Implementation                                                     | Example
-------- | ---------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------
pathname | Contains the path extracted from the url                   | The path is extracted using the `url` library in node.             | /action/join
query    | Contains an object formed from the query string parameters | The query parameters are extracted using the `url` library in node | {key1:value1, key2:value2}
protocol | Specifies either `http` or `https`                         | This also takes into account the `X-Forward-Proto` header          | http
