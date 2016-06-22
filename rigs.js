'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );

gulp.task( 'test', function ( callback ) {
    runSequence(
        'init', [ 'lint-jscs', 'lint-jshint' ],
        callback );
} );

module.exports = {
    rigs: [ 'rig-javascript' ],
    commands: {
        'init': {
            taskname: 'rig-javascript__install-rig',
            path: __dirname
        },
        'lint-jscs': {
            taskname: 'rig-javascript__jscs',
            src: [ __dirname + '/core/**/*.js' ]
        },
        'lint-jshint': {
            taskname: 'rig-javascript__jshint',
            src: [ __dirname + '/core/**/*.js' ]
        }
    }
};
