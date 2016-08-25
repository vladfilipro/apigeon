'use strict';

var utils = require( __dirname + '/../utils' );

module.exports = function ( driversPath, config ) {

    var _self = this;

    config = config || {};
    config.driver = config.driver || 'memory';
    config.table = config.table || 'session';

    var dbDriver = utils.getFile( config.driver, [ driversPath, __dirname + '/../drivers' ] );

    var sessionId;
    var sessionData = {};

    var createSessionEntry = function ( sId, cb ) {

        var values = {
            'session_id': sId,
            'created': utils.date.datetime(),
            'data': {},
            'updated': utils.date.datetime()
        };

        dbDriver.insert( config.table, sId, values, function ( err ) {
            if ( err ) {
                utils.log( 'Session creation error: ', err );
                cb( false );
                return;
            }
            sessionId = sId;
            cb( true );
        } );

    };

    var saveSession = function ( sId, sData, cb ) {

        if ( !sId ) {
            cb( false );
            return;
        }

        sData[ 'session_id' ] = sId;
        sData.updated = utils.date.datetime();

        dbDriver.update( config.table, sId, sData, function ( err ) {
            if ( err ) {
                utils.log( 'Error saving session data: ', err );
                cb( false );
                return;
            }
            cb( true );
        } );

    };

    var findSession = function ( sId, cb ) {

        if ( !sId ) {
            cb( false );
            return;
        }

        dbDriver.select( config.table, sId, function ( err, data ) {
            if ( err ) {
                utils.log( 'Error retrieving session ', err );
                cb( false );
                return;
            }
            if ( typeof data !== 'object' || Object.keys( data ).length === 0 ) {

                // Separating an error from an unexisting session
                cb( false );
                return;
            }
            sessionId = sId;
            sessionData = data.data;
            cb( true );
        } );

    };

    this.start = function ( requestedSessionId ) {
        var promise = utils.q.promise();
        findSession( requestedSessionId, function ( findSessionSuccess ) {
            if ( !findSessionSuccess ) {
                createSessionEntry( utils.uniqueId(), function ( createSessionSuccess ) {
                    if ( createSessionSuccess ) {
                        promise.resolve( true );
                    } else {
                        promise.reject( true );
                    }
                } );
            } else {
                promise.resolve( true );
            }
        } );
        return promise.result;
    };

    this.update = function () {
        var promise = utils.q.promise();
        saveSession( sessionId, {
            data: sessionData
        }, function ( saveSessionSuccess ) {
            if ( saveSessionSuccess ) {
                promise.resolve( true );
            } else {
                promise.reject( true );
            }
        } );
        return promise.result;
    };

    this.set = function ( key, value ) {
        sessionData[ key ] = value;
        return _self;
    };

    this.get = function ( key ) {
        return sessionData[ key ];
    };

    this.remove = function ( key ) {
        delete sessionData[ key ];
        return _self;
    };

    this.getSessionId = function () {
        return sessionId;
    };

};
