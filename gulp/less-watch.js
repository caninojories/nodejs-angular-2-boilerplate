(function() {
  'use strict';

  var LessPluginAutoPrefix  = require('less-plugin-autoprefix'),
      autoprefix            = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

  module.exports = function(require) {
    require.gulp.task('less-watch', function () {
      require.$.watch(require.config.less, function(buffer) {
        let src = buffer['history'][0];
        let position = buffer['history'][0].lastIndexOf('/');
        let dest  = buffer['history'][0].substr(0, position + 1);

        require.logger(require.$.util, 'Compiling Less ---> Css');
        return require.gulp.src(src)
          .pipe(require.$.less({
            plugins: [autoprefix]
          }))
          .on('error', require.handleErrors)
          .pipe(require.$.autoprefixer({ browsers: [
            'Android >= 2.3',
            'BlackBerry >= 7',
            'Chrome >= 9',
            'IE >= 8',
            'Firefox >= 4',
            'Explorer >= 9',
            'iOS >= 5',
            'Opera >= 11',
            'Safari >= 5',
            'OperaMobile >= 11',
            'OperaMini >= 6',
            'ChromeAndroid >= 9',
            'FirefoxAndroid >= 4',
            'ExplorerMobile >= 9'
          ]}))
          .on('error', require.handleErrors)
          .pipe(require.gulp.dest(dest))
          .pipe(require.$.csslint({
          'font-sizes': false,
          'gradients': false,
          'important': false,
          'compatible-vendor-prefixes': false,
          'unqualified-attributes': false,
          'box-model': false,
          'display-property-grouping': false,
          'adjoining-classes': false
          }))
          .on('error', require.handleErrors)
          // .pipe(require.$.csslint.reporter());
      });
    });
  };
}());
