// Updates all configuration
// - Updates environment urls
// - Add timestamp, version to angularJS readable script
// * This will be displayed in the footer
// Different generation for build & dev

var config = require('./config');
var gulp = require('gulp');
/** 
 * Easy way to get gulp passed variables
 * e.g. --env production
 * args.env == 'production'
 */
var args = require('yargs').argv;
var gulpNgConfig = require('gulp-ng-config');

// To read xml files
var fs = require('fs');
var xml2js = require('xml2js');
var version = '1.0.0'; // Default version in case of error
var del = require('del');

gulp.task('config.clean', function () {
    return del.sync(config.constantsDev);
});

gulp.task('config.update', ['config.clean'], function (callback) {
    // Get the environment from the command line
    // Or default to 'localdev' if not passed
    var env = args.env || 'localdev';

    // Retrieve version number from pom.xml
    var parser = new xml2js.Parser();
    fs.readFile('./pom.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            version = result['project']['version'][0];
            // Create angularJS readable file using gulpNgConfig
            gulp.src(config.envF)
                .pipe(gulpNgConfig('config.env', {
                    environment: env,
                    constants: {
                        buildtime: Date.now(),
                        version: version
                    },
                    wrap: '(function () {\n\'use strict\';\n/*jshint ignore:start*/\n return <%= module %> /*jshint ignore:end*/\n})();'
                }))
                .pipe(gulp.dest(config.constantsDist))
                .pipe(gulp.dest(config.constantsDev))
                .on('end', callback); // Let gulp know task is done
        });
    });
});