'use strict';

var utils = require( './../utils' );

var _validateKeys = function ( keys, container ) {
    var valid = true;
    Object.keys( keys ).forEach( function ( key ) {
        if ( container[ key ] !== keys[ key ] ) {
            valid = false;
        }
    } );
    return valid;
};

var _replaceAttributes = function ( expression, attrs ) {
    var result = expression;
    Object.keys( attrs ).forEach( function ( attr ) {
        result = result.replace( new RegExp( ':' + attr, 'g' ), attrs[ attr ] );
    } );
    return result;
};

var _parseWhere = function ( expression, attrs ) {

};

module.exports = {
    insert: function ( params, cb ) {
        global[ params.table ] = global[ params.table ] || [];
        var record = {};

        // We do not want to keep references, we want string values.
        Object.keys( params.values ).forEach( function ( key ) {
            record[ key ] = JSON.stringify( params.values[ key ] );
        } );

        global[ params.table ].push( record );
        cb( null, 'Values inserted into ', params.table );
    },
    update: function ( params, cb ) {
        global[ params.table ] = global[ params.table ] || [];

        var test = ' col1 = :test || ( col2 = :test && col3 = :backup ) ';
        if ( ( col1 === test ) || ( col2 === test && col3 === backup ) ) {

        }

        var where = _replaceAttributes( params.where, params.attrs );

        global[ params.table ].forEach( function ( value ) {
            if ( validateKeys( params.keys, value ) ) {

            }
        } );

        var updateConfig = {
            'TableName': params.table,
            'Key': params.keys,
            'UpdateExpression': params.values,
            'ExpressionAttributeValues': params.attrs
        };
        if ( params.condition ) {
            updateConfig.ConditionExpression = params.condition;
        }
        docClient.update( updateConfig, function ( err, data ) {
            cb( err, data );
        } );
    },
    select: function ( params, cb ) {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var selectConfig = {
            'TableName': params.table,
            'ExpressionAttributeValues': params.attrs
        };
        if ( params.columns ) {
            selectConfig.ProjectionExpression = params.columns;
        }
        if ( params.filter ) {
            selectConfig.FilterExpression = params.filter;
        }
        if ( typeof params.limit === 'number' ) {
            selectConfig.Limit = params.limit;
        }
        if ( typeof params.orderDirection === 'boolean' ) {
            selectConfig.ScanIndexForward = params.orderDirection;
        }
        if ( Object.keys( params.keys ).length > 0 ) {
            selectConfig.Key = params.keys;
            docClient.get( selectConfig, function ( err, data ) {
                cb( err, ( data ) ? data.Item : null );
            } );
        } else {
            if ( params.condition ) {
                selectConfig.KeyConditionExpression = params.condition;
                docClient.query( selectConfig, function ( err, data ) {
                    cb( err, ( data ) ? data.Items : null );
                } );
            } else {
                var scan = function ( cfg, callback ) {
                    docClient.scan( cfg, function ( err, data ) {
                        callback( err, ( data ) ? data.Items : null );
                        if ( !err ) {
                            cfg.ExclusiveStartKey = data.LastEvaluatedKey;
                            scan( cfg, callback );
                        }
                    } );
                };
                scan( selectConfig, function ( err, data ) {
                    cb( err, data );
                } );
            }
        }
    }
};
