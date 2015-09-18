var gulp = require('gulp');

gulp.task('browserify', require('./tasks/browserify.js'));

gulp.task('watchify', require('./tasks/watchify.js'));

gulp.task('libs', require('./tasks/libs.js'));

gulp.task('styles', require('./tasks/styles.js'));

gulp.task('test', require('./tasks/test.js'));

gulp.task('watch-styles', function(){
  gulp.watch(['./src/styles/**/*'],['styles']);
});

gulp.task('build',['browserify','libs','styles']);

gulp.task('watch',['watchify','libs','styles','watch-styles']);

gulp.task('default',['build']);
