var gulp = require('gulp'),
	mainBowerFiles = require('main-bower-files'),
	runSequence = require('run-sequence'),
	gulpFilter = require('gulp-filter'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	minify = require('gulp-minify-css');

/**
 * Filters for bower main files
 */
var jsFilter = gulpFilter('**/*.js'),
	cssFilter = gulpFilter('**/*.css'),
	fontFilter = gulpFilter(['**/*.svg', '**/*.eot', '**/*.woff', '**/*.ttf']),
	imgFilter = gulpFilter(['**/*.png', '**/*.gif', '**/*.jpg']);


/**
 * public folder structure
 * @type {{js: string, css: string, images: string, fonts: string, root: string}}
 */
var public = {
	js: 'assets/js',
	css: 'assets/css',
	images: 'assets/img',
	fonts: 'assets/fonts',
	root: '',
	build: 'assets/build'
};

var matcher = {
	less: 'assets/less/*.less',
	js: 'assets/js/*.js',
	css: 'assets/css/*.css'
};

/**
 * Compile all less files into css file
 * and move them to public folder
 */
gulp.task('less', function(){
	return gulp.src([matcher.less])
		.pipe(plumber())
		.pipe(less())
		// .pipe(minify())
		.pipe(gulp.dest("assets/css"));
});


/**
 * move all js files to build folder
 */
gulp.task('js', function(){
	return gulp.src(matcher.js);
	// .pipe(uglify())
	// .pipe(concat('app.min.js')).pipe(gulp.dest(public.build));
});
/**
 * move all css files to build folder
 */
gulp.task('css', ['less'], function(){
	return gulp.src(matcher.css)
	// .pipe(minify())
	.pipe(concat('app.min.css')).pipe(gulp.dest(public.build));
});

/**
 * Watchers
 */
gulp.task('watch', function(){
	gulp.watch([matcher.less, matcher.css], ['less']);
	gulp.watch(matcher.js, ['js']);
});

/**
 * Default task
 */
gulp.task('default', ['js', 'less' , 'watch']);