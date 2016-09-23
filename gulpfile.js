var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var pngcrush      = require('imagemin-pngcrush');
var include       = require('gulp-include');
var autoprefixer  = require('gulp-autoprefixer');
var pixrem        = require('gulp-pixrem');
var notify        = require('gulp-notify');
var cleanCSS      = require('gulp-clean-css');
var sourcemaps    = require('gulp-sourcemaps');
var browserSync   = require("browser-sync").create();


var themePath     = "files/starterkit/";
var bsProxy       = "nutshell.localhost";

var paths = {
    src: {
        styles:     themePath + 'src/scss/default.scss',
        scripts:    themePath + 'src/js/**/*.js',
        images:     themePath + 'src/img/**/*',
    },
    dist: {
        styles:     themePath + 'dist/css',
        scripts:    themePath + 'dist/js',
        images:     themePath + 'dist/img',
    },
    watch: {
        styles:     themePath + 'src/scss/**/*.scss',
        scripts:    themePath + 'src/js/**/*.js',
        images:     themePath + 'src/img/**/*',
        templates:  'templates/**/*'
    },
};

gulp.task('styles', function() {
    gulp.src(paths.src.styles)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
    			browsers: ['last 3 versions'],
    			cascade: false
    		}))
    		.pipe(pixrem({ rootValue: '16px' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function() {
    gulp.src(paths.src.scripts)
    	.pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.scripts))
});

gulp.task('images', function () {
    return gulp.src(paths.src.images)
        .pipe(imagemin({
          progressive: true,
        }))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('serve', ['styles'], function() {
    // https://www.browsersync.io/docs/gulp#gulp-sass-maps
    browserSync.init({
        proxy: bsProxy,
        open: false
    });

    gulp.watch(paths.watch.styles,  ['styles']);
    gulp.watch(paths.watch.templates).on('change', browserSync.reload);
    gulp.watch(paths.watch.scripts, ['scripts']).on('change', browserSync.reload);
});

gulp.task('deploy', ['styles', 'scripts', 'images']);
gulp.task('default', ['serve']);