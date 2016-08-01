var gulp          = require('gulp'),
    plumber       = require('gulp-plumber'),
    sass          = require('gulp-sass'),
    uglify        = require('gulp-uglify'),
    livereload    = require('gulp-livereload');
    imagemin      = require('gulp-imagemin');
    pngcrush      = require('imagemin-pngcrush');
    include       = require('gulp-include');
    autoprefixer  = require('gulp-autoprefixer');
    pixrem       =  require('gulp-pixrem');


var themePath     = "files/starterkit/";

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
        styles:     'files/**/*.scss',
        scripts:    themePath + 'src/js/**/*.js',
        images:     themePath + 'src/img/**/*',
    },
};

gulp.task('styles', function() {
    gulp.src(paths.src.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
    			browsers: ['last 3 versions'],
    			cascade: false
    		}))
    		.pipe(pixrem({ rootValue: '16px' }))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(livereload({ auto: false }));
});

gulp.task('scripts', function() {
    gulp.src(paths.src.scripts)
    	.pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(livereload({ auto: false }));
});

gulp.task('images', function () {
    return gulp.src(paths.src.images)
        .pipe(imagemin({
          progressive: true,
        }))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.watch.styles,  ['styles']);
    gulp.watch(paths.watch.scripts, ['scripts']);
    gulp.watch(paths.watch.images, 	['images']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);
gulp.task('deploy', ['styles', 'scripts', 'images']);
