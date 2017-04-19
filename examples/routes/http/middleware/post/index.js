'use strict'

const Apigeon = require( './../../../../../core' )

const form = '\
    <form method="POST" action="/middleware"> \
        <label for="field1">field1</label> \
        <input type="text" value="Test" name="field1" /> \
        <input type="submit" /> \
    </form> \
    <br/> \
'

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    cb(
      form,
      200,
      { 'Content-Type': 'text/html' }
    )
  }

}
