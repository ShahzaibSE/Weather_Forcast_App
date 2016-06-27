///<reference path="typings/tsd.d.ts"/>

//Import Libraries.
import gulp = require('gulp');
import ts = require('gulp-typescript');
import uglify = require('gulp-uglify');
var rm = require('gulp-rm');
var beautify = require('gulp-beautify');
import nodemon = require('gulp-nodemon');


//Remove File.
gulp.task('remove',function(){
     gulp.src('scripts/**/*js').
           pipe(rm())
})

//Transpile Code.
gulp.task('transpile',function(){
    return gulp.src('scripts/**/*ts').
           pipe(ts({
               "target":"es5",
                typescript:require('typescript')
           })).pipe(gulp.dest('builds')) 
})

//Starting Server.
gulp.task('nodemon',function(){
    nodemon({
        script:'scripts/server.js',
        ext:'js html',
        env:{'NODE_ENV':'development'}
    })
})

//Watcher for scripts.
gulp.task('watch',function(){
    gulp.watch(['scripts/**/*ts'],['transpile'])
})

//Default.
gulp.task('default',['remove','watch']);
