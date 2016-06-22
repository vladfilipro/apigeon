'use strict';

var AWS = require( 'aws-sdk' );

var CONFIG = require( __dirname + '/../../config' );

AWS.config.update( {
    accessKeyId: CONFIG.AWS.accessKeyId,
    secretAccessKey: CONFIG.AWS.secretAccessKey,
    region: CONFIG.AWS.region,
    sslEnabled: false
} );

module.exports = {
    insert: function ( params, cb ) {
        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.put( {
            'TableName': params.table,
            'Item': params.values
        }, function ( err, data ) {
            cb( err, data );
        } );
    },
    update: function ( params, cb ) {
        var docClient = new AWS.DynamoDB.DocumentClient();
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
