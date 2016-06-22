'use strict';

module.exports = function ( db ) {

    var _self = this;

    var query = {
        command: '',
        columns: '',
        table: '',
        condition: '',
        attrs: {},
        filter: '',
        orderColumn: '',
        orderDirection: '',
        limit: '',
        insertData: {},
        setExpression: '',
        keys: {}
    };

    var parameters = {
        select: function () {
            return {
                columns: query.columns,
                table: query.table,
                keys: query.keys,
                condition: query.condition,
                attrs: query.attrs,
                filter: query.filter,
                orderColumn: query.orderColumn,
                orderDirection: query.orderDirection,
                limit: query.limit
            };
        },
        insert: function () {
            return {
                table: query.table,
                values: query.insertData
            };
        },
        update: function () {
            return {
                table: query.table,
                values: query.setExpression,
                keys: query.keys,
                condition: query.condition,
                attrs: query.attrs
            };
        },
        delete: function () {
            return {
                table: query.table,
                keys: query.keys,
                condition: query.condition,
                attrs: query.attrs
            };
        }
    };

    this.execute = function ( cb ) {
        db[ query.command.toLowerCase() ]( parameters[ query.command.toLowerCase() ](), cb );
    };

    this.select = function ( cols ) {
        query.command = 'SELECT';
        query.cols = cols;
        return _self;
    };
    this.insert = function ( values ) {
        query.command = 'INSERT';
        query.insertData = values || '{}';
        return _self;
    };
    this.update = function ( setExpression ) {
        query.command = 'UPDATE';
        query.setExpression = setExpression;
        return _self;
    };
    this.delete = function () {
        query.command = 'DELETE';
        return _self;
    };
    this.table = function ( table ) {
        query.table = table;
        return _self;
    };
    this.setKeys = function ( keys ) {
        query.keys = keys;
        return _self;
    };
    this.condition = function ( condition ) {
        query.condition = condition;
        return _self;
    };
    this.attrs = function ( attrs ) {
        query.attrs = attrs;
        return _self;
    };
    this.filter = function ( filter, attrs ) {
        query.filter = filter;
        query.filterAttr = attrs;
        return _self;
    };
    this.order = function ( col, direction ) {
        query.orderColumn = col;
        query.orderDirection = direction;
        return _self;
    };
    this.limit = function ( limit ) {
        query.limit = limit;
        return _self;
    };

};
