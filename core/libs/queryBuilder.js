'use strict';

module.exports = function ( db ) {

    var _self = this;

    var query = {
        command: '',
        columns: [],
        table: '',
        where: '',
        attrs: {},
        orderColumn: '',
        orderDirection: '',
        limit: '',
        insertData: {},
        updateData: {},
        keys: {}
    };

    var parameters = {
        select: function () {
            return {
                columns: query.columns,
                table: query.table,
                where: query.where,
                orderColumn: query.orderColumn,
                orderDirection: query.orderDirection,
                limit: query.limit,
                attrs: query.attrs
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
                values: query.updateData,
                where: query.where,
                attrs: query.attrs
            };
        },
        delete: function () {
            return {
                table: query.table,
                where: query.where,
                attrs: query.attrs
            };
        }
    };

    var _expectation = function ( value, type ) {
        switch ( type ) {
            case 'array':
                return Array.isArray( value );
            case 'function':
                return ( typeof value === 'function' );
            case 'number':
                return ( typeof value === 'number' );
            case 'string':
                return ( typeof value === 'string' );
            case 'object':
                return ( typeof value === 'object' );
        }
    };

    this.execute = function ( cb ) {
        db[ query.command.toLowerCase() ]( parameters[ query.command.toLowerCase() ](), cb );
    };

    this.select = function ( columns ) {
        if ( !_expectation( columns, 'array' ) ) {
            throw 'Select statement expects an array of columns';
        }
        query.command = 'SELECT';
        query.columns = columns;
        return _self;
    };
    this.insert = function ( values ) {
        if ( !_expectation( values, 'object' ) ) {
            throw 'Insert statement expects an object containing values';
        }
        query.command = 'INSERT';
        query.insertData = values;
        return _self;
    };
    this.update = function ( updateData ) {
        if ( !_expectation( updateData, 'object' ) ) {
            throw 'Undate statement expects an object containing values';
        }
        query.command = 'UPDATE';
        query.updateData = updateData;
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
    this.where = function ( where ) {
        query.where = where;
        return _self;
    };
    this.attrs = function ( attrs ) {
        if ( !_expectation( attrs, 'object' ) ) {
            throw 'Attrs method expects an object containing values';
        }
        query.attrs = attrs;
        return _self;
    };
    this.order = function ( column, direction ) {
        query.orderColumn = column;
        query.orderDirection = direction;
        return _self;
    };
    this.limit = function ( limit ) {
        query.limit = limit;
        return _self;
    };

};
