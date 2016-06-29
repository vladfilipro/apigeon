'use strict';

var utils = require( __dirname + '/../utils' );

module.exports = function ( renderersPath, api, acceptedContentTypes ) {

    var defaultRenderer = 'application/json';

    var preferedRenderer = ( api ) ? api.defaultRenderer() : defaultRenderer;

    var getFile = function ( name ) {
        return utils.getFile( name.replace( '/', '-' ), [ renderersPath, __dirname + '/../renderers' ] );
    };

    var getRendererByType = function ( type ) {
        var renderer = getFile( type );
        if ( renderer ) {
            return {
                name: type,
                renderer: renderer
            };
        }
        return false;
    };

    var getFirstRenderer = function ( list ) {
        var renderer;
        for ( var i = 0; i < list.length; i++ ) {
            renderer = getFile( list[ i ] );
            if ( renderer ) {
                return {
                    name: list[ i ],
                    renderer: renderer
                };
            }
        }
        return false;
    };

    var loadRenderer = function ( name, acceptedList ) {
        if ( acceptedList.length === 0 || acceptedList.indexOf( name ) !== -1 ) {
            return getRendererByType( name );
        } else {
            return getFirstRenderer( acceptedList );
        }
    };

    var acceptedContentTypesList = ( typeof acceptedContentTypes === 'string' ) ? acceptedContentTypes.split( ',' ) : [];
    var data = loadRenderer( preferedRenderer, acceptedContentTypesList ) || getRendererByType( preferedRenderer );

    this.render = data.renderer;
    this.contentType = data.name;

};
