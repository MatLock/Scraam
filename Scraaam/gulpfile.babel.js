import gulp from 'gulp'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import del from 'del'
import gzip from 'gulp-gzip'
import tar from 'gulp-tar'
import babel from 'gulp-babel'
import minify from 'gulp-minify'
import uglify from 'gulp-uglify'
import mocha from 'gulp-mocha'
import gls from 'gulp-live-server'
import sourcemaps from 'gulp-sourcemaps';
import tap from 'gulp-tap';
import fs from 'fs';
import webpack from 'gulp-webpack';
import rename from 'gulp-rename';


const gulpsync = require('gulp-sync')(gulp);

gulp.task('prueba', function() {
    console.log("holaaaa");
    console.log(gulpsync);
});

gulp.task('clean-all', () => del(['target']));


gulp.task('transpile:minify',['clean-all','test:backend'],() => {
    return gulp.src(['src/backend/**/*.js'])
    .pipe(minify())
    .pipe(babel())
    .pipe(gulp.dest('target'))
  });

gulp.task('test:backend', () =>{
	return gulp.src('src/test/backend/*.js', { read: false })
		.pipe(mocha({
      compilers: 'js:babel-core/register',
      require: ['babel-polyfill']
    }));
});

gulp.task('delete-non-minified-files',() => {
    return gulp.src('target/**')
        .pipe(tap(function(file){
          let filename = file.history[0];
          if(filename.indexOf('-min.js') === -1 &&
              filename.indexOf('.js') !== -1){
                fs.unlinkSync(file.history[0])
          }
        }));
});

gulp.task("rename:minified:files",['delete-non-minified-files'],() =>{
  return gulp.src('target/**/*.js')
             .pipe(rename((path) => path.basename = path.basename.replace('-min','')))
             .pipe(gulp.dest('target'));
});

gulp.task("clean-workspace",['rename:minified:files'],() =>{
  return gulp.src('target/**/*.js')
      .pipe(tap(function(file){
        let filename = file.history[0];
        if(filename.indexOf('-min.js') !== -1){
          fs.unlinkSync(filename)
        }
      }));
})

gulp.task('build',gulpsync.sync(['transpile:minify','clean-workspace']),() => {
    console.log(">>>>   BUILD SUCCESSFULL!!!   <<<<");
});

gulp.task('start',['build'],() =>{
  const server = gls.new('target/app.js')
  server.start();
});

gulp.task('build:watch', () =>
  gulp.watch('src/**/*.js', ['build'])
);

/**
  PREGUNTAR COMO CORRER CON WEBPACK ARCHIVOS JS DE ANGULAR NO SE PUEDEN MINIFICAR
  LO MISMO PARA LOS TEST DE MOCHA
**/
gulp.task('transpile:webpack', function() {
  return gulp.src('src/frontend/**/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('target'));
});
