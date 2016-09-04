(function() {
  'use strict';

  module.exports = function(require) {
    var options = require.config.getWireDepDefaultOptions();
    /* Only include stubs if flag is enabled */
    var js = require.config.js;
    require.gulp.task('wiredep', function() {
      require.logger(require.$.util, 'Wire up our js css and app.js into our html');
      return require.gulp
        .src(require.config.index)
        .pipe(require.wiredep(options))
        .pipe(require.gulp.dest(require.config.client));
    });
  };
}());
