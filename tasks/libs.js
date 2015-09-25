var gulp = require('gulp');

function libs(){
  gulp.src(['./node_modules/bootswatch/**/*'])
    .pipe(gulp.dest('./public/css/bootstrap'));
  gulp.src(['./node_modules/bootstrap/fonts/**/*'])
    .pipe(gulp.dest('./public/css/bootstrap/fonts'));
  gulp.src(['./node_modules/font-awesome/**/*'])
    .pipe(gulp.dest('./public/css/font-awesome'));
}

module.exports = libs;
