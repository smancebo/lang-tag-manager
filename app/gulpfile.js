

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlclean');
var cleanCss = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');



var app = [
  'source/app/**/*.routes.js',
  'source/app/**/*.service.js',
  'source/app/**/*.controller.js',
  'source/app/app.js'
];

var vendors = [
  '../bower_components/angular/angular.min.js',
  '../bower_components/angular-route/angular-route.min.js',
  '../bower_components/angular-animate/angular-animate.min.js',
  '../bower_components/angular-aria/angular-aria.min.js',
  '../bower_components/angular-messages/angular-messages.min.js',
  '../bower_components/angular-material/angular-material.min.js',
  '../bower_components/angular-ui-router/release/angular-ui-router.min.js'

];

var vendorCss = [
  '../bower_components/angular-material/angular-material.min.css',
  '../bower_components/material-design-icons/iconfont/material-icons.css'
];


var appCss = [
    'source/assets/css/*.css'
];


var sourceIndex = 'source/index.html';
var scssPath = 'source/assets/scss/*.scss';

var templates = 'source/app/**/*.html';
var templateOptions = {
  standalone : true,
  module : 'templates'
};

gulp.task('default',['build-vendors','build-css-vendors','build-templates',
                     'build-app','build-sass','watchIndex',
                     'watchApp','watchCss','watchTemplates','watchSass'],
function(){
  console.log('gulp up and running');
});

gulp.task('build-sass', function(){
  return gulp.src(scssPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-vendors', function(){
  return gulp.src(vendors)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build-templates', function(){
  return gulp.src(templates)
    .pipe(htmlmin())
    .pipe(templateCache(templateOptions))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function(){
  return gulp.src(app)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build-app',['lint'], function(){
  return gulp.src(app)
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('buildIndex', function(){
  return gulp.src(sourceIndex)
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function(){
  return gulp.src(appCss)
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build-css-vendors', function(){
    return gulp.src(vendorCss)
    .pipe(concat('vendors.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watchIndex', function(){
  gulp.watch(sourceIndex, ['buildIndex']);
});

gulp.task('watchApp', function(){
  gulp.watch(app, ['build-app']);
});

gulp.task('watchCss', function(){
  gulp.watch(appCss, ['build-css']);
});

gulp.task('watchTemplates', function(){
  gulp.watch(templates,['build-templates']);
});

gulp.task('watchSass', function(){
  gulp.watch(scssPath,['build-sass']);
});
