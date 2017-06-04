var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    os = require('os'),
    gulpopen = require('gulp-open')
    // webpack = require('webpack'),
    // gulpwebpack = require('gulp-webpack')

var host = {
    path:'dist/',
    port:3090,
    index:'index.html'
}

var browser = os.platform()==='linux' ? 'google-chrome' : (
    os.platform()==='darwin' ? 'google chrome' : (
        os.platform()==='win32' ? 'chrome' : 'chrome'));


//拼接include公共部分代码
gulp.task('fileinclude',function(done){
    gulp.src('src/views/*.html')
        .pipe(fileinclude({
            prefix:'@@',
            bathpath:'@file'
        }))
        .pipe(gulp.dest('dist/views'))
        .on('end',done)
})

//清楚文件
gulp.task('clean',function(done){
    gulp.src(['dist'])
        .pipe(clean())
        .on('end',done)
})

//合并、压缩css
gulp.task('cssmin',function(done){
    gulp.src('src/css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end',done)
})

//压缩图片
gulp.task('imagemin',function(done){
    gulp.src('src/images/*')
        .pipe(imagemin([imagemin.optipng({optimizationLevel: 10})]))
	    .pipe(gulp.dest('dist/images'))
        .on('end',done)
})

//拷贝图片
gulp.task('copy:images',function(done){
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
        .on('end',done)
})

//拷贝js
gulp.task('copy:js',function(done){
    gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js'))
        .on('end',done)
})

//文件监控
gulp.task('watch',function(done){
    gulp.watch('src/**/*',['cssmin','fileinclude'])
        .on('end',done)
})
	
//运行服务器
gulp.task('connect',function(){
    console.log('正在连接着......')
    connect.server({
        root:host.path,
        port:host.port,
        livereload:true
    })
})

//打开浏览器
gulp.task('open',function(done){
    gulp.src('')
        .pipe(gulpopen({
            app:browser,
            uri:'http://localhost:3090/views/'+host.index
        }))
})
	
//任务组装
gulp.task('dev',['fileinclude','cssmin','imagemin','copy:js','connect','watch','open'])


