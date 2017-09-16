var runSequence = require('run-sequence');
var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var htmlmin = require('gulp-html-minify');
var mocha = require('gulp-mocha');

gulp.task('default', function (callback) {
	runSequence('build', 'test', callback);
});

gulp.task('build', function (callback) {
	runSequence('clean', ['css', 'js', 'html'], callback);
});

gulp.task('css', function (callback) {
	runSequence('less', 'cssmin', callback);
});

gulp.task('js', function (callback) {
	runSequence('browserify', 'uglify', callback);
});

gulp.task('html', function (callback) {
	runSequence(['useref:html', 'useref:htmlmin'], 'htmlmin', callback);
});

gulp.task('clean', function () {
	return gulp.src('dist/**/*')
		.pipe(clean());
});

gulp.task('less', function () {
	return gulp.src('src/view/notes.less')
		.pipe(less())
		.pipe(rename('notes.css'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('cssmin', function () {
	return gulp.src('dist/notes.css')
		.pipe(cssmin())
		.pipe(rename('notes.min.css'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function () {
	return browserify({
			entries: ['src/controller.js', 'src/view/filter.js'],
			external: ['angular'],
      debug: true
		})
		.bundle()
		.pipe(source('notes.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('uglify', function () {
	return gulp.src('dist/notes.js')
		.pipe(uglify())
		.pipe(rename('notes.min.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('useref:html', function () {
	return gulp.src('src/notes.html')
		.pipe(useref({
			noAssets: true,
			noconcat: true
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('useref:htmlmin', function () {
	return gulp.src('src/notes.html')
		.pipe(useref({
			noAssets: true
		}))
		.pipe(rename('notes.min.html'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('htmlmin', function () {
	return gulp.src('dist/notes.min.html')
		.pipe(htmlmin())
		.pipe(gulp.dest('dist/'));
});

gulp.task('test', function () {
	gulp.src('test/*.test.js')
		.pipe(mocha({
			reporter: 'spec'
		}));
});