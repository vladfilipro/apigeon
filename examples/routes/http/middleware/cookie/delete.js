'use strict'

const Apigeon = require( './../../../../../core' )

module.exports = class Default extends Apigeon.classes.HttpRouteClass {

  execute ( cb ) {
    let cookie = new Apigeon.classes.CookieClass( 'cookie1', '' )
    cookie.expires = Date.now()

    cb( '', 302, {
      'Location': '/middleware',
      'Set-Cookie': cookie.toString()
    } )
  }

}
