import gulp from 'gulp';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import eslint from 'gulp-eslint';
import rimraf from 'rimraf';
import run from 'run-sequence';
import webpack from 'webpack';
import server from 'gulp-live-server';

const webpackConfig = require('./webpack.config.babel');

const paths = {
	js: ['./server/**/*.js'],
	destination: './dist/server'
};

// ESLint configuration
gulp.task('lint', () => gulp
	.src([
		'server/**/*.js'
	])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())
);

/* server */
gulp.task('build:server', cb => {
	run('clean', 'babel', cb);
});

gulp.task('build-server', cb => {
	run('clean', 'lint', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
	rimraf(paths.destination, cb);
});

gulp.task('babel', shell.task([
	'babel server --out-dir dist/server'
]));

let express;

gulp.task('server', () => {
	express = server.new(paths.destination);
});

gulp.task('restart', () => {
	express.start.bind(express)();
});

gulp.task('watch', () => {
	gulp.watch([paths.js], ['build-server']);
});

/* client */
gulp.task('webpack:build', cb => {
	run('clean-client', 'build-client', cb);
});

gulp.task('clean-client', cb => {
	rimraf('./dist/client', cb);
});

gulp.task('build-client', (cb) => webpack(
	webpackConfig, (err, stats) => {
		if (err) throw err;
		cb();
	})
);

/* shared */
gulp.task('build-shared', () => {
	gulp.src(['./shared/**/*.*'])
		.pipe(babel())
		.pipe(gulp.dest('dist/shared'));
});

// The default tasks
gulp.task('default', cb => {
	run(
		'server',
		'build-server',
		'build-shared',
		'watch',
		cb
	);
});

// Build
gulp.task('build', cb => {
	run(
		'server',
		'lint',
		'build:server',
		'build-shared',
		'webpack:build',
		cb
	);
});
