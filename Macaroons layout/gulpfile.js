'use strict';

let gulp = require('gulp');
let less = require('gulp-less');
let cssmin = require('gulp-cssmin');
// const concatCss = require('gulp-concat-css');


const src_path = './src/styles/less/style.less';

gulp.task('less', function(){

    return gulp.src(src_path)
        .pipe(less({}))
        // .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
    return gulp.watch(src_path, gulp.series('less'));
});


