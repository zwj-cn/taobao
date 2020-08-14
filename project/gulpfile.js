//引入gulp
const gulp = require('gulp');

//引入压缩html文件
const html = require('gulp-minify-html');
//压缩html文件
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html') //载入文件
        .pipe(html()) //压缩
        .pipe(gulp.dest('dist/')); //输出
});

//SASS编译
const sass = require('gulp-sass');
//引入生成.map文件模块
const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
const plugins = require('gulp-load-plugins')(); //返回的是一个函数体。需要再次执行。
//编译sass,同时生成.map文件(.map调式文件,调试的核心是scss文件)
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed' //压缩的
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/sass/'));
});


//引入压缩css包
const css = require('gulp-clean-css');
//压缩css
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css') //载入文件
        .pipe(css()) //压缩
        .pipe(gulp.dest('dist/css/')); //输出
});


//es6转es5的三个模块
//gulp-babel@7   babel-core       babel-preset-es2015
// const babel = require('gulp-babel'); //主要
// const babelcore = require('babel-core');
// const es2015 = require('babel-preset-es2015');
//引入压缩js的包
// const script = require('gulp-uglify');
//压缩js文件。
// gulp.task('uglifyjs', () => {
//     return gulp.src('src/js/*.js')
//         .pipe(babel({ //先将es6转换成es5
//             presets: ['es2015'] //es2015->es6  es2016->es7...
//         }))
//         .pipe(script()) //再执行压缩
//         .pipe(gulp.dest('dist/js/'));
// });


//gulp-imagemin图片压缩(png)
const imagemin = require('gulp-imagemin');
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin()) //执行压缩
        .pipe(gulp.dest('dist/img/'));
});




//监听
const watch = require('gulp-watch');
gulp.task('default', function() {
    watch(['src/*.html','src/css/*.css','src/sass/*.scss'],gulp.parallel('uglifyhtml','uglifycss','compilesass'));
});