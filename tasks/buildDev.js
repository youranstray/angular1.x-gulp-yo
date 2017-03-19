// This is a build file for painless development
// Unlike the normal (production) build file, it will additionally copy over 'mock_data' into the root folder

var gulp = require('gulp'),
    config = require('./config'),
    runSequence = require('run-sequence').use(gulp);

gulp.task('copyMockData', function() {
    // Copies the mock data folder over to www
    return gulp.src([config.base + '/mock_data/**/*.json'])
                .pipe(gulp.dest(config.dist + '/mock_data'));
});

// Builds dist folder for dev/staging deployment
// Difference from 'build' task is that it copies over the mock_data folder
gulp.task('buildDev', function(callback) {
    runSequence(
        'build',
        'copyMockData',
        callback);
});