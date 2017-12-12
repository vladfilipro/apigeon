'use strict'

const Apigeon = require( './../../../../core' )

const bodyParser = require( 'body-parser' )

const form = ' \
    <h1> Menu: </h1>\n\r \
    <span>Post: </span>\n\r \
    <a href="/middleware/post">Post data</a>\n\r \
    <br/>\n\r \
    <hr/>\n\r \
    <br/>\n\r \
'

module.exports = class Default extends Apigeon.classes.HttpRouteClass {
  setup ( done ) {
    this.middlewares.push( bodyParser.urlencoded( { extended: false } ) )
    done()
  }

  execute ( cb ) {
    cb(
      form + '; body: ' + JSON.stringify( this.request.body ),
      200,
      { 'Content-Type': 'text/html' }
    )
  }
}
