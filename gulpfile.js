var gulp = require('gulp')
    gutil = require('gulp-util'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    //coffeeify = require('coffeeify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    assign = require('lodash.assign');

var customOpts = {
  entries: ['./src/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);

// by using watchify we now have an 'update' event
// that we can bind to our bundle action
var bundler = watchify(browserify(opts));

/* Apply transforms here */
//bundler.transform(coffeeify);

gulp.task('browserify', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle(){
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('default',['browserify']);
