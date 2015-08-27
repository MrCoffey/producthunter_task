var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var watch = require ('gulp-watch');
var path = {coffee: "./src/**/*.coffee", src : "./dist/"}


gulp.task('coffee', function(done) {
  gulp.src(path.coffee)
   .pipe(coffee({bare: true}))
   .pipe(concat("app.js"))
   .pipe(gulp.dest(path.src))
   .on("end", done)
});

gulp.task('watch', function(){
  gulp.watch(path.coffee, ['coffee'])
}),

gulp.watch('src/**/*.*')
