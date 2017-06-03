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
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import istanbul from 'gulp-istanbul';
import codecov from 'gulp-codecov';

const gulpsync = require('gulp-sync')(gulp);
const Server = require('karma').Server;
const protractor = require("gulp-protractor").protractor;



gulp.task('clean-all', () => del(['target']));


gulp.task('test:frontend', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:backend', () =>{
	return gulp.src('src/test/backend/*.js', { read: false })
		.pipe(mocha({
      compilers: 'js:babel-core/register',
      require: ['babel-polyfill']
    }));
});

gulp.task('test:protractor',() =>{
  return gulp.src(["src/test/frontend/e2e/*.js"])
    .pipe(protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://localhost:3001']
    }));
});

gulp.task('test:frontend-all',['test:frontend',"test:protractor"],() =>{});

gulp.task('test:all',gulpsync.sync(['test:backend','test:frontend-all']),()=>{});

gulp.task('test:all-non-e2e',gulpsync.sync(['test:backend','test:frontend']),() =>{});



gulp.task('coverage', () => {
  return gulp.src('src/test/backend/*.js', { read: false })
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});


gulp.task('codecov',() =>{
  return gulp.src('./coverage/lcov.info')
    .pipe(codecov());
})

gulp.task('lint', function() {
   return gulp.src('src/backend/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter(stylish));
});

gulp.task('transpile:minify',gulpsync.sync(['clean-all','test:frontend','test:backend']),() => {
    return gulp.src(['src/backend/**/*.js'])
    .pipe(minify())
    .pipe(babel())
    .pipe(gulp.dest('target/backend'))
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
  const server = gls.new('target/backend/app.js')
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
  return gulp.src('src/frontend/**.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('target/frontend'));
});
