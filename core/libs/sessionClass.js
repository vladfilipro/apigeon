'use strict';

var utils = require( __dirname + '/../utils' );
var QueryBuilder = require( __dirname + '/queryBuilder' );

module.exports = function ( config ) {

    var _self = this;

    var dbDriver = require( __dirname + '/../drivers/' + config.driver );

    var sessionId;
    var created;
    var sessionData = {};

    var createSessionEntry = function ( sId, cb ) {

        if ( !sId ) {
            cb( false );
            return;
        }

        var values = {
            'SessionID': sId,
            'Created': utils.date.datetime(),
            'SessionData': {},
            'Updated': utils.date.datetime()
        };
        var qb = new QueryBuilder( dbDriver );
        qb.table( config.table );
        qb
            .insert( values )
            .execute( function ( err ) {
                if ( err ) {
                    console.log( 'Session creation error: ', err );
                    cb( false );
                    return;
                }
                created = values.Created;
                sessionId = sId;
                cb( true );
            } );
    };

    var saveSession = function ( sId, sCreated, sData, cb ) {

        if ( !sId || !sCreated ) {
            cb( false );
            return;
        }

        var qb = new QueryBuilder( dbDriver );
        qb.table( config.table );
        qb
            .update( 'set SessionData = :sessionData, Updated = :updated' )
            .setKeys( {
                'SessionID': sId,
                'Created': sCreated
            } )
            .attrs( {
                ':sessionData': sData,
                ':updated': utils.date.datetime()
            } )
            .execute( function ( err ) {
                if ( err ) {
                    console.log( 'Error saving session data: ', err );
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

        var qb = new QueryBuilder( dbDriver );
        qb.table( config.table );
        qb
            .select()
            .condition( 'SessionID = :sessionId' )
            .attrs( {
                ':sessionId': sId
            } )
            .execute( function ( err, data ) {
                if ( err ) {
                    console.log( 'Error retrieving session ', err );
                    cb( false );
                    return;
                }
                if ( data.length === 0 ) {

                    // Separating an error from an unexisting session
                    cb( false );
                    return;
                }
                sessionId = sId;
                sessionData = data[ 0 ].SessionData;
                created = data[ 0 ].Created;
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
        saveSession( sessionId, created, sessionData, function ( saveSessionSuccess ) {
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
