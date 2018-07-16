let gulp = require('gulp');
let modernizr = require('gulp-modernizr');

gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            'options': [
                'setClasses'
            ]
        }))
        .pipe(gulp.dest('./app/temp/scripts/'));
});