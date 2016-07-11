var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var paths = [
    "../ju-dialog/build/**/*",
    "../ju-loading/build/**/*",
    "../ju-picker/build/**/*",
    "../ju-tab/build/**/*",
    "../ju-slider/build/**/*",
    "../ju-lazy-load/build/**/*",
    "../ju-checkbox/build/**/*",
    "../ju-progress-bar/build/**/*"
];

gulp.task('dialog', function() {
    gulp.src(paths[0])
        .pipe(gulp.dest("build/ju-dialog/"));
});

gulp.task('loading', function() {
    gulp.src(paths[1])
        .pipe(gulp.dest("build/ju-loading/"));
});

gulp.task('picker', function() {
    gulp.src(paths[2])
        .pipe(gulp.dest("build/ju-picker/"));
});

gulp.task('tab', function() {
    gulp.src(paths[3])
        .pipe(gulp.dest("build/ju-tab/"));
});

gulp.task('slider', function() {
    gulp.src(paths[4])
        .pipe(gulp.dest("build/ju-slider/"));
});

gulp.task('lazyload', function() {
    gulp.src(paths[5])
        .pipe(gulp.dest("build/ju-lazy-load/"));
});

gulp.task('checkbox', function() {
    gulp.src(paths[6])
        .pipe(gulp.dest("build/ju-checkbox/"));
});

gulp.task('progressBar', function() {
    gulp.src(paths[7])
        .pipe(gulp.dest("build/ju-progress-bar/"));
});

gulp.task('default', ['dialog', 'loading', 'picker',
 'tab', 'slider', 'lazyload', 'checkbox', 'progressBar'], function() {

	browserSync.init({
        server: __dirname
    });

    gulp.watch(["./**/*.html", "./**/*.css", "./**/*.js"]).on('change', browserSync.reload);
});
