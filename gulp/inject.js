(function() {
  'use strict';

  var runSequence = require('run-sequence');

  module.exports = function(require) {
    require.logger(require.$.util, 'Wire up .css and .js into the html');
    require.gulp.task('inject', function() {
      runSequence(
        'js',
        'angular-dependencies',
        'css', function() {
          require.logger(require.$.util, 'Finished...');
      });
    });

    require.gulp.task('js', function() {
      require.logger(require.$.util, 'Injecting js into our html');
      return require.gulp
        .src(require.config.index)
        .pipe(require.$.inject(require.gulp.src(require.config.js, {read: false}), {
          addPrefix: '',
          addSuffix: require.config.suffix,
          addRootSlash: true
        }))
        /*inject it to our client view*/
        .pipe(require.gulp.dest(require.config.client));
    });

    require.gulp.task('angular-dependencies', function() {
      require.logger(require.$.util, 'Injecting Angular 2 Modules into our html');
      return require.gulp
        .src(require.config.index)
        .pipe(require.$.inject(require.gulp.src(require.config.angularDependencies, {read: false}), {
          addPrefix: '',
          addSuffix: require.config.suffix,
          addRootSlash: true,
          starttag: '<!-- inject:angular-dependencies -->'
        }))
        /*inject it to our client view*/
        .pipe(require.gulp.dest(require.config.client));
    });

    require.gulp.task('css', function() {
      require.logger(require.$.util, 'Injecting css into our html');
      console.log(require.config.css);
      return require.gulp
        .src(require.config.index)
        .pipe(require.$.inject(require.gulp.src(require.config.css, {read: false}), {
          addPrefix: '',
          addSuffix: require.config.suffix,
          addRootSlash: true
        }))
        .pipe(require.gulp.dest(require.config.client));
    });
  };
}());
