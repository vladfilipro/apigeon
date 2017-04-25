'use strict'

const Apigeon = require( './../../../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    let cookie = new Apigeon.classes.CookieClass( 'cookie1', 'myCookieValue' )
    cookie.expires = new Date( Date.now() + 3600 )

    cb( '', 302, {
      'Location': '/middleware',
      'Set-Cookie': cookie.toString()
    } )
  }

}
