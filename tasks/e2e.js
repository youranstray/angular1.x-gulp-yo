'use strict';
/* jshint camelcase: false */

var config = require('./config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var angularProtractor = require('gulp-angular-protractor');

gulp.task('e2e', [
    'browserSync',
    'protractor',
    'watch-e2e'
]);

gulp.task('watch-e2e', function () {
    gulp.watch('e2e-tests/**/*.js', ['protractor']);
});

// Setting up the test task
gulp.task('protractor', function(callback) {
    gulp
        .src(['e2e-tests/**/*.js'])
        .pipe(angularProtractor({
            configFile: './karma-e2e.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:3002'],
            debug: false,
            autoStartStopServer: true
        }))
        .on('error', function(e) {
            console.log(e);
            this.emit('end');
        })
        .on('end', function() {
            // Close browser sync server
            browserSync.exit();
            callback();
        });
});