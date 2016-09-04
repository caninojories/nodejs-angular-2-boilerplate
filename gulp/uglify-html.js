(function() {
  'use strict';

  let glob = require('glob');

  module.exports = function(require) {
    require.gulp.task('uglify-html', function () {
      require.logger(require.$.util, 'Uglifying ---> HTML');

      require.config.html.forEach(function(file) {
        glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            if (item.indexOf('min') !== -1) {
              return;
            }
            var lastOccurence = item.lastIndexOf('/');
            var pathPosition  = item.substr(0, lastOccurence);
            var name          = item.substr(lastOccurence + 1, file.length);

            return require.gulp.src(item)
              .pipe(require.$.htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                caseSensitive: true
              }))
              .pipe(require.$.rename('min.' + name))
              .pipe(require.gulp.dest(pathPosition));
          });
        });
      });
    })
  };
}());
