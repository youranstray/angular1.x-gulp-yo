/**
 * Documentation-related gulp tasks
 * 1. `gulp docs` - generate method documentation from source code comments
 * 2. `gulp serve:docs` - Opens a new browser window with generated documentation
 */

var shell = require('gulp-shell'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();

/**
 * Gulp task to regenerate method documentation.
 * See README.md section on documentation
 * @example
 * gulp docs
 */
gulp.task('docs', shell.task([
  'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/common/conf.json '+   // config file
    '-t docs/documentation-template '+   // template file
    //'-t node_modules/angular-jsdoc/angular-template '+   // template file
    '-d docs/methods '+                           // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r app/scripts docs/tutorials '  +                 // source code directory
    '-u docs/tutorials'                              // tutorials directory
]));

/**
 * Gulp task to start a localhost server,
 * and serve the index page of documentation
 * @example
 * gulp serve:docs
 */
gulp.task('serve:docs', function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: './docs/methods'
        },
        port: 4001,
        ui: false
    });
});
