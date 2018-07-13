let gulp = require('gulp');
let watch = require('gulp-watch');
let browserSync = require('browser-sync').create();

gulp.task('watch', function(){

    browserSync.init({
      server: {
        baseDir: 'app'
      }
    });
  
    watch('./app/index.html', function(){
      browserSync.reload();
    });
  
    watch(
      ['./app/assets/styles/**/*.css', 
       './app/assets/styles/**/*.scss', 
       './app/assets/styles/**/*.postcss'], function() {
      gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function(){
      gulp.start('scriptsRefresh');
    });
    
  });

  gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
  });

  gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
  });

