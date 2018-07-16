let gulp = require('gulp');
let svgSprite = require('gulp-svg-sprite');
let rename = require('gulp-rename');
let clear = require('del');
let svg2png = require('gulp-svg2png');

let config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
     mode: {
         css: {
             variables: {
                replaceSvgWithPng: function(){
                    return function(sprite, render){
                        return render(sprite).split('.svg').join('.png');
                    }
                }
             },
             sprite: 'sprite.svg',
             render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }  
         }
     }
}

gulp.task('beginClean', function(){
    return clear(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite'));
});

gulp.task('createPngCopy', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function(){
    gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    return clear('./app/temp/sprite');
})

gulp.task('icons', ['beginClean','createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

