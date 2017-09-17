const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')

const config = {
    js:{
        src: 'src/js/*',
        dest: 'dist/js/',
    },
    less: {
        src: 'src/less/*',
        dest: 'dist/css/'
    },
    html:{
        src: 'src/*.html',
        dest: 'dist/',
    },
    vendor: {
        src: 'src/vendor/*',
        dest: 'dist/vendor/'
    },
    assets:{
        src:'src/assets/*',
        dest:'dist/assets'
    }
}

gulp.task('clean', function(){
    del('dist')
})

gulp.task('less', function() {
    gulp.src(config.less.src)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.less.dest))
})

gulp.task('js', function() {
    gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.js.dest))
})

gulp.task('html', function() {
    gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest))
})

gulp.task('vendorAssets', function(){
    gulp.src(config.assets.src)
        .pipe(gulp.dest(config.assets.dest))

    gulp.src(config.vendor.src)
        .pipe(gulp.dest(config.vendor.dest))
})

gulp.task('browser', function(){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
})

gulp.task('default', ['html', 'js', 'less', 'vendorAssets'], function() {
    gulp.watch(config.js.src, ['js'])
    gulp.watch(config.html.src, ['html'])
    gulp.watch(config.less.src, ['less'])
    gulp.start('browser')
})

gulp.task('build', ['clean'], function() {
    gulp.start('html', 'js', 'less', 'vendorAssets')
})