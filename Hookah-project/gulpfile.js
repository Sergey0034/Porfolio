'use strict';

let gulp = require('gulp');
let less = require('gulp-less');
// let cssmin = require('gulp-cssmin');

const src_path = './src/styles/style.less';

gulp.task('less', function(){

    return gulp.src(src_path)
        .pipe(less({}))
        // .pipe(cssmin())
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
    return gulp.watch(src_path, gulp.series('less'));
});
