# ConnectionClass

An instance of the ConnectionClass is generated for every request.

The class also binds itself to the socket provided in the constructor. The socket gets a new property `apigeon` who refers to an object with the following description:

```
{
    connection: connection // Current connection instance
}
```

Property | Description
--- | --- | --
this.id | A unique identifier
this.socket | The connection socket ( socket represent different objects between http and socket routes)

---

Method | Description | Return
--- | --- | ---
close () |  Instantly closes a socket connection | -

This method is used to terminate a connection from within the route

---
