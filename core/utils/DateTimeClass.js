'use strict'

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
let formatTime = ( date ) => {
  return zeroFill( date.getHours(), 2 ) + ':' + zeroFill( date.getMinutes(), 2 ) + ':' + zeroFill( date.getSeconds(), 2 ) + '.' + zeroFill( date.getMilliseconds(), 3 )
}

class DateTime {

  constructor ( dateTimeString ) {
    this.date = new Date( dateTimeString )
  }

  static now () {
    return ( new Date() ).now()
  }

  datetime () {
    return formatDate( this.date ) + ' ' + formatTime( this.date )
  }

  raw () {
    return this.date.toString()
  }

}

module.exports = DateTime
