var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber')


gulp.task('less', function() {
    gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))

    gulp.src('src/js/vendor/*.js')
        .pipe(gulp.dest('dist/js/vendor'))
})

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('default', function() {
    gulp.start('html', 'js', 'less')
})

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js'])
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/**/*.less', ['less'])
})
