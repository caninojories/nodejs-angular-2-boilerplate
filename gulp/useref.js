(function() {
  'use strict';

  module.exports = function(require) {
		require.gulp.task('useref', function() {
      return require.gulp.src('./app/index.html')
        .pipe(require.$.useref())
        .pipe(require.gulp.dest('dist'));
		});
  };
}());
