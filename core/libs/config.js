'use strict';

module.exports = function ConfigClass() {
    var _data = {
        'server': {
            'cookies': true
        }
    };

    var _set = function ( path, value, registry ) {
        var keys = path.split( '.' );
        if ( keys.length > 1 ) {
            var newKey = keys.shift();
            if ( registry[ newKey ] === undefined ) {
                registry[ newKey ] = {};
            }
            return _set( keys.join( '.' ), value, registry[ newKey ] );
        }
        registry[ path ] = value;
    };

    var _get = function ( path, data ) {
        return path.split( '.' ).reduce( function ( registry, key ) {
            return ( registry === undefined ) ? registry : registry[ key ];
        }, data );
    };

    this.set = function ( key, value ) {
        _set( key, value, _data );
    };

    this.get = function ( path ) {
        return _get( path, _data );
    };

};
