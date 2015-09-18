var gulp = require('gulp');

function libs(){
  gulp.src(['./node_modules/bootswatch/**/*'])
    .pipe(gulp.dest('./public/css/bootstrap'));
  gulp.src(['./node_modules/bootstrap/fonts/**/*'])
    .pipe(gulp.dest('./public/css/bootstrap/fonts'));
  gulp.src(['./node_modules/font-awesome/**/*'])
    .pipe(gulp.dest('./public/css/font-awesome'));
  gulp.src(['./node_modules/kendo-ui-core/dist/js/kendo.custom.js'])
    .pipe(gulp.dest('./public/js/kendo'));
  gulp.src(['./node_modules/knockout-kendo/build/knockout-kendo.js'])
    .pipe(gulp.dest('./public/js/kendo'));
  gulp.src(['./node_modules/kendo-ui-core/dist/styles/web/**/*'])
    .pipe(gulp.dest('./public/css/kendo'));
}

module.exports = libs;
