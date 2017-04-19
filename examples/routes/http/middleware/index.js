'use strict'

const Apigeon = require( './../../../../core' )

const bodyParser = require( 'body-parser' )

const form = ' \
    <h1> Menu: </h1>\n\r \
    <span>Cookies: </span>\n\r \
    <a href="/middleware/cookie">Set cookie</a>\n\r \
    &nbsp;&nbsp;|&nbsp;&nbsp;\n\r \
    <a href="/middleware/cookie/delete">Delete cookie</a>\n\r \
    <br/>\
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
      form + 'cookies: ' + this.request.apigeon.cookies[ 'cookie1' ] + ' ; body: ' + JSON.stringify( this.request.body ),
      200,
      { 'Content-Type': 'text/html' }
    )
  }

}
