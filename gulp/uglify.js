(function() {
  'use strict';

  let glob = require('glob');

  module.exports = function(require) {
    require.gulp.task('uglify-assets-assets-js', function () {
      require.logger(require.$.util, 'Uglifying Assets ---> JS');

      require.config.assetsJS.forEach(function(file) {
        glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            if (item.indexOf('min') !== -1) {
              return;
            }

            var lastOccurence = item.lastIndexOf('/');
            var pathPosition  = item.substr(0, lastOccurence);
            var name          = item.substr(lastOccurence + 1, file.length);

            return require.gulp.src(item)
            .pipe(require.$.uglify({
              mangle: false,
              output: {
                bracketize: true
              },
              compressor: {
                properties: false,
                booleans: false
              }
            }))
            .pipe(require.$.rename('min.' + name))
            .pipe(require.gulp.dest(pathPosition));
          });
        });
      });
    });

    require.gulp.task('uglify-assets-app-ts', function() {
      require.logger(require.$.util, 'Uglifying  Assets-App-TS ---> JS');
      require.config.assetsAppTS.forEach(function(file) {
        glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            let position = item.lastIndexOf('/');
            let dest     = item.substr(0, position + 1);

            return require.gulp.src(item)
            .pipe(require.$.uglify({
              mangle: false,
              output: {
                bracketize: true
              },
              compressor: {
                properties: false,
                booleans: false
              }
            }))
            .on('error', require.handleErrors )
            .pipe(require.gulp.dest(dest));
          });
        });
      });
    });
  };
}());
