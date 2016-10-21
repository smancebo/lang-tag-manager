

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlclean');
var cleanCss = require('gulp-clean-css');
var useref = require('gulp-useref')
var gulpif = require('gulp-if')
var del = require('del');


var app = [
  'source/app/app.js',
  'source/app/**/*.service.js',
  'source/app/**/*.controller.js'
];

var delpath = [
  'dist/app.js',
  'dist/templates.js'
];

var sourceIndex = 'source/index.html';

var templates = 'source/app/**/*.html';
var templateOptions = {
  standalone : true,
  module : 'templates'
}

gulp.task('default',['usemin', 'clean','watchIndex'], function(){
  console.log('gulp up and running')
});

gulp.task('usemin',['build-app','build-templates'],function(){
  return gulp.src(sourceIndex)
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCss()))
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist'))
});

gulp.task('build-templates', function(){
  return gulp.src(templates)
    .pipe(templateCache(templateOptions))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('dep', function(){
  console.log('dependent task');
});

gulp.task('clean',['usemin'], function(){
  return del(delpath);
});

gulp.task('build-app', function(){
  return gulp.src(app)
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'))
});

gulp.task('watchIndex', function(){
  gulp.watch(sourceIndex, ['usemin']);
});
