var config = require('./config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
/**
 * Build-Task Files
 * NOTE: Depends on sme of the dev-tasks as well
 */
var del = require('del');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence')
    .use(gulp);
var wiredep = require('wiredep').stream;
var merge = require('merge-stream');

// main task
gulp.task('build', function(callback) {
    runSequence(
        'cleanDist',
        'config.update', // reset config
        'wiredepBuild',
        'injectAll',
        // 'testSingle',
        'lint',
        'sass',
        'minFiles',
        'copy',
        callback);
});

// Removes 'www' dist folder
gulp.task('cleanDist', function() {
    return del.sync(config.dist);
});


gulp.task('wiredepBuild', function() {
    return gulp.src([config.karmaConf, config.mainFile], {base: './'})
        .pipe(wiredep({
            exclude: [
                // TODO inject excluded
            ],
            devDependencies: false
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('copy', function() {
    var html = gulp.src(config.htmlF, {base: config.base})
        .pipe(minifyHtml({
            conditionals: true,
            loose: true,
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest(config.dist));

    var fonts = gulp.src(config.fontsF, {base: config.base})
        .pipe(gulp.dest(config.dist));

    // TODO this ain't perfect
    var images = gulp.src(config.imagesF, {base: config.base})
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(config.dist));

    // copy translation files
    // Translation files are already minified in translate task
    var translations = gulp.src(config.translationsF, {base: config.base})
                            .pipe(gulp.dest(config.dist));

    return merge(html, fonts, images, translations);
});


gulp.task('minFiles', function() {
    return gulp.src(config.mainFile)
        .pipe(useref())
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(config.dist));
});


function browserSyncInit(baseDir, files) {  
    browserSync.instance = browserSync.init(files, {
        startPath: '/', server: { baseDir: baseDir }
    });
}

/* serve task running build before */
// starts a production server
// runs the build task before, 
// and serves the dist folder
// gulp.task('serve:dist', ['build'], function () {  
//   browserSyncInit(config.dist);
// });

// starts a production server
// and serves the dist folder
gulp.task('serve:dist', function () {  
    browserSyncInit(config.dist);
});