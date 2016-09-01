'use strict';

var utils = require( __dirname + '/../utils' );

module.exports = function ( renderersPath, route, acceptedContentTypes ) {

    var fallbackRenderer = 'text/plain';
    var emptyRender = 'empty';

    var defaultRenderers = ( route ) ? route.getAcceptedRenderers() : true;

    var acceptedContentTypesList;

    if ( Array.isArray( acceptedContentTypes ) ) {

        acceptedContentTypesList = acceptedContentTypes;
    } else if ( typeof acceptedContentTypes === 'string' ) {

        acceptedContentTypesList = acceptedContentTypes.split( ',' );
    } else {

        acceptedContentTypesList = [];
    }

    var getRenderer = function ( name ) {
        var renderer = utils.getFile( name.replace( '/', '-' ), [ renderersPath, __dirname + '/../renderers' ] );
        if ( renderer ) {
            return {
                name: name,
                renderer: renderer
            };
        }
        return false;
    };

    var getFirstRenderer = function ( list, acceptedList ) {
        var renderer;
        for ( var i = 0; i < list.length; i++ ) {
            renderer = getRenderer( list[ i ] );
            if ( Array.isArray( acceptedList ) ) {
                if ( renderer && acceptedList.indexOf( list[ i ] ) !== -1 ) {
                    return renderer;
                }
            } else {
                if ( renderer ) {
                    return renderer;
                }
            }
        }
        return false;
    };

    var loadRenderer = function ( accepted, requested ) {
        if ( accepted === true ) {

            // Get first renderer in header that exists OR the default renderer
            return getFirstRenderer( requested ) || getRenderer( fallbackRenderer );
        } else if ( Array.isArray( accepted ) && accepted.length > 0 ) {

            // Get first renderer in header that exists and is accepted OR get the first accepted renderer
            return getFirstRenderer( requested, accepted ) || getRenderer( accepted[ 0 ] );
        } else {

            // This page should not be rendered, so we are sending it to an empty renderer
            return getRenderer( emptyRender );
        }
    };

    var data = loadRenderer( defaultRenderers, acceptedContentTypesList );

    this.render = data.renderer;
    this.contentType = data.name;

};
