(function() {
  'use strict';

  let LessPluginAutoPrefix  = require('less-plugin-autoprefix'),
      autoprefix            = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

  let glob = require('glob');

  module.exports = function(require) {
    require.gulp.task('less-compile-and-uglify', function () {
      require.config.less.forEach(function(file) {
        require.logger(require.$.util, 'Compiling Less ---> Css for the glob ' + file);

        glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            let lastOccurence = item.lastIndexOf('/');
            let pathPosition  = item.substr(0, lastOccurence);
            let name          = item.substr(lastOccurence + 1, file.length);

            let position = item.lastIndexOf('/');
            let dest     = item.substr(0, position + 1);

            return require.gulp.src(item)
            .pipe(require.$.less({
              plugins: [autoprefix]
            }))
            .on('error', require.handleErrors)
            .pipe(require.$.autoprefixer({ browsers: [
              'Android >= 2.3',
              'BlackBerry >= 7',
              'Chrome >= 9',
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
            .on('error', require.handleErrors )
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
            .on('error', require.handleErrors )
            .pipe(require.args.env === 'DEV' ? require.$.sourcemaps.init() : require.$.cleanCss({compatibility: 'ie8'}))
            .on('error', require.handleErrors )
            .pipe(require.$.rename(require.args.env === 'DEV' ? name.replace('less', 'css') : 'min.' + name.replace('less', 'css')))
            .pipe(require.gulp.dest(dest))
          });
        })
      });
    });
  };
}());
