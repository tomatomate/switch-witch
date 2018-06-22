// gulp
const gulp = require('gulp')
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const baseDir = './dist/'
const paths = {
	js: baseDir,
}

gulp.task('watch', () => {
	// webpack
	watch([ './src/**/*.js', './src/**/*.jsx' ], vinyl => {
		console.log("[javascript] " + vinyl.path)
		return gulp.src(vinyl.path)
			.pipe(plumber({ errorHandler: notify.onError('<%= error.message =%>') }))
			.pipe(babel())
			.pipe(gulp.dest(paths.js))
			//.pipe(browser.stream())
	})
})

gulp.task('default', ['watch'], () => {})

