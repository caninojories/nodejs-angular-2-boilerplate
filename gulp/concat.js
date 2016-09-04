(function() {
	'use strict';

	module.exports = function(require) {
		require.gulp.task('concat-js', function() {
		  return require.gulp.src(require.config.bower_js.concat(require.config.js))
		    .pipe(require.$.concat('app.min.js', {newLine: ';'}))
		    .pipe(require.gulp.dest('./assets/js/dist/'));
		});

		require.gulp.task('concat-css', function() {
			return require.gulp.src(require.config.bower_css.concat(require.config.css))
				.pipe(require.$.concat('app.min.css'))
				.pipe(require.gulp.dest('./assets/css/dist/'));
		});
	}
}());
