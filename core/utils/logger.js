'use strict'

let colors = {
  'reset': '0',
  'hicolor': '1',
  'underline': '4',
  'inverse': '7',
  'black': '30',
  'red': '31',
  'green': '32',
  'yellow': '33',
  'blue': '34',
  'magenta': '35',
  'cyan': '36',
  'white': '37',
  'bg_black': '40',
  'bg_red': '41',
  'bg_green': '42',
  'bg_yellow': '43',
  'bg_blue': '44',
  'bg_magenta': '45',
  'bg_cyan': '46',
  'bg_white': '47'
}

let color = ( style ) => {
  return '\x1B[' + colors[style] + 'm'
}

let zeroFill = ( number, digits ) => {
  let result = ''
  for ( let i = 1; i <= digits; i++ ) {
    result = '' + ( number % 10 ) + result
    number = Math.floor( number / 10 )
  }
  return result
}

let formatDate = ( date ) => {
  return date.getFullYear() + '-' + zeroFill( date.getMonth() + 1, 2 ) + '-' + zeroFill( date.getDate(), 2 )
}
var formatTime = ( date ) => {
  return zeroFill( date.getHours(), 2 ) + ':' + zeroFill( date.getMinutes(), 2 ) + ':' + zeroFill( date.getSeconds(), 2 ) + '.' + zeroFill( date.getMilliseconds(), 3 )
}

let timestamp = () => {
  let date = new Date()
  return '[ ' + formatDate( date ) + ' ' + formatTime( date ) + ' ] '
}

module.exports = {

  log: function () {
    console.log.apply( this, [ timestamp(), color( 'green' ) + '[ LOG ]' + color( 'reset' ), ...arguments ] )
  },

  info: function () {
    console.log.apply( this, [ timestamp(), color( 'bg_green' ) + '[ INFO ]' + color( 'reset' ), ...arguments, '\n\r' ] )
  },

  list: function ( title, rows, numbered ) {
    console.log( '\n\r' )
    console.log.apply( this, [ color( 'cyan' ) + '[ ' + title + ' ]' + color( 'reset' ) ] )
    if ( Array.isArray( rows ) ) {
      for ( let i = 0; i < rows.length; i++ ) {
        console.log.call( this, color( 'yellow' ) + ( ( numbered ) ? ' ' + ( i + 1 ) + '.' : ' -' ) + ' ' + color( 'reset' ) + color( 'yellow' ) + rows[ i ] + color( 'reset' ) )
      }
    }
    console.log( '\n\r' )
  },

  warn: function () {
    console.log( '\n\r' )
    console.log.apply( this, [ timestamp(), color( 'hicolor' ) + color( 'bg_yellow' ) + '[ ERROR ]' + color( 'reset' ), color( 'yellow' ), ...arguments, color( 'reset' ) ] )
    console.log( '\n\r' )
  },

  error: function () {
    console.log( '\n\r' )
    console.log.apply( this, [ timestamp(), color( 'hicolor' ) + color( 'bg_red' ) + '[ ERROR ]' + color( 'reset' ), color( 'red' ), ...arguments, color( 'reset' ) ] )
    console.log( '\n\r' )
  }
}
