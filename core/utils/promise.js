'use strict'

function PromiseClass () {
  var _cb = {
    then: [],
    succ: [],
    err: []
  }

  var _data = null
  var _error = null

  this.resolve = function ( data ) {
    if ( _data || _error ) {
      throw new Error( 'Promise has already been resolved.' )
    }
    _data = data
    for ( var i = 0; i < _cb.succ.length; i++ ) {
      _cb.succ[ i ]( data )
    }
    for ( var j = 0; j < _cb.then.length; j++ ) {
      _cb.then[ j ]( null, data )
    }
  }

  this.reject = function ( err ) {
    if ( _data || _error ) {
      throw new Error( 'Promise has already been resolved.' )
    }
    _error = err
    for ( var i = 0; i < _cb.err.length; i++ ) {
      _cb.err[ i ]( err )
    }
    for ( var j = 0; j < _cb.then.length; j++ ) {
      _cb.then[ j ]( err, null )
    }
  }

  var _result = {
    then: function ( cb ) {
      _cb.then.push( cb )
      if ( _data || _error ) {
        cb( _error, _data )
      }
      return _result
    },
    success: function ( cb ) {
      _cb.succ.push( cb )
      if ( _data ) {
        cb( _data )
      }
      return _result
    },
    error: function ( cb ) {
      _cb.err.push( cb )
      if ( _error ) {
        cb( _error )
      }
      return _result
    }
  }

  this.result = _result
}

module.exports = {
  promise: function () {
    return new PromiseClass()
  },
  all: function ( promises ) {
    var promise = new PromiseClass()
    var counter = 0
    var thereWasAnError = false
    var resolution = function ( err ) {
      counter++
      if ( err ) {
        thereWasAnError = true
      }
      if ( counter === promises.length ) {
        if ( thereWasAnError ) {
          promise.reject( true )
        } else {
          promise.resolve( true )
        }
      }
    }
    for ( var i = 0; i < promises.length; i++ ) {
      promises[ i ].then( resolution )
    }
    return promise.result
  }
}
