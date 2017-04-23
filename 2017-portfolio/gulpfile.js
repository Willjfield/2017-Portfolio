var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var sourceJS = './public/js/portfolio.js';

// Include built-in node functions
var exec = require('child_process').exec;

var swallow = false;
function swallowError(error) {
	if (swallow) {
		console.log(error);
		this.emit('end');
	} else {
		throw error;
	}
}

// Lint Task
gulp.task('lint', function() {
	return gulp.src([
			'./models/**/*.js',
			'./routes/**/*.js',
			'keystone.js',
			'package.json',
			'gulpfile.js',
			sourceJS
		])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile Our Less
gulp.task('scss', function() {
	return gulp.src([
			'./public/styles/site/*.scss'
		])
		.pipe(scss()).on('error', swallowError)
		.pipe(postcss([ autoprefixer() ])).on('error', swallowError)
		.pipe(concat('app.css'))
		.pipe(gulpif(argv.min, minifycss({advanced: false})))
		.pipe(gulp.dest('./public/styles/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src( [
		// './public/js/libs/jquery/jquery.min.js',
		sourceJS
	])
		.pipe(concat('app.js'))
		.pipe(gulpif(argv.min, uglify()))
		.pipe(gulp.dest('./public/js/'));
});

var keystonePaths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

// Watch Files For Changes
gulp.task('watch', function() {
	swallow = true;
	gulp.watch(keystonePaths.src, ['lint']);
	gulp.watch(sourceJS, ['lint', 'scripts']);
	gulp.watch('./public/styles/site/' + '*.scss', ['scss']);
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('serve', ['lint', 'scss', 'scripts']);
gulp.task('default', ['serve', 'runKeystone', 'watch']);
