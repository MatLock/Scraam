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
import webpackmodule from 'webpack';
import rename from 'gulp-rename';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import istanbul from 'gulp-babel-istanbul';
import codecov from 'gulp-codecov';
import eslint from 'gulp-eslint';
import run from 'gulp-run';
import mywebpackconfig from './webpack.config.js';

const gulpsync = require('gulp-sync')(gulp);
const Server = require('karma').Server;
const protractor = require("gulp-protractor").protractor;
const isparta = require('isparta');


gulp.task('clean-all', () => del(['dist']));


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
    .pipe(protractor({configFile: "protractor.conf.js"}));
});

gulp.task('test:frontend-all',['test:frontend',"test:protractor"],() =>{});

gulp.task('test:all',gulpsync.sync(['test:backend','test:frontend-all']),()=>{});

gulp.task('test:all-non-e2e',gulpsync.sync(['test:backend','test:frontend']),() =>{});


gulp.task('coverage',() =>{
    run('npm run coverage-test').exec();
});


gulp.task('codecov',() =>{
  return gulp.src('./coverage/lcov.info')
    .pipe(codecov());
});

gulp.task('lint', () => {
	return gulp.src(['src/backend**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
});


gulp.task('transpile:minify',['clean-all'],() => {
    return gulp.src(['src/backend/**/*.js'])
    .pipe(minify())
    .pipe(babel())
    .pipe(gulp.dest('dist/backend'))
  });

gulp.task('delete-non-minified-files',() => {
    return gulp.src('dist/backend/**/*.js')
        .pipe(tap(function(file){
          let filename = file.history[0];
          if(filename.indexOf('-min.js') === -1 &&
              filename.indexOf('.js') !== -1){
                fs.unlinkSync(filename)
          }
        }));
});

gulp.task("rename:minified:files",['delete-non-minified-files'],() =>{
  return gulp.src('dist/backend/**/*.js')
             .pipe(rename((path) => path.basename = path.basename.replace('-min','')))
             .pipe(gulp.dest('dist/backend'));
});

gulp.task("clean-workspace",['rename:minified:files'],() =>{
  return gulp.src('dist/backend/**/*.js')
      .pipe(tap(function(file){
        let filename = file.history[0];
        if(filename.indexOf('-min.js') !== -1){
          fs.unlinkSync(filename)
        }
      }));
})

gulp.task('build',gulpsync.sync(['transpile:minify','transpile:webpack','clean-workspace']),() => {
    console.log(">>>>   BUILD SUCCESSFULL!!!   <<<<");
});

gulp.task('start',['build'],() =>{
  const server = gls.new('dist/backend/app.js')
  server.start();
});

gulp.task('build:watch', () =>
  gulp.watch('src/**/*.js', ['build'])
);

gulp.task('transpile:webpack', function() {
  return gulp.src('src/frontend/bootstrap.js')
    .pipe(webpack(mywebpackconfig,webpackmodule))
    .pipe(gulp.dest('dist/frontend/'));
});
