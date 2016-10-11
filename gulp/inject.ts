import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';

let config = require('./../gulp.config')();

export class Inject {
  constructor() {
    this.js()
    this.css();
    this.angularDependencies();
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('inject', _ => {
      new Logger('Wire up .css and .js into the html');

      this._modules
      .runsequence(
        'js',
        'angular-dependencies',
        'css', function() {
          new Logger('Finished...');
      });
    });
  }

  js() {
    let self = this;

    this._modules
    .gulp.task('js', _ => {
      new Logger('Injecting js into our html');

      return self._modules.gulp
      .src(config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(config.js, {read: false}), {
        addPrefix: '',
        addSuffix: config.suffix,
        addRootSlash: true
      }))
      /*inject it to our client view*/
      .pipe(self._modules.gulp.dest(config.client));
    });
  }

  css() {
    let self = this;

    this._modules
    .gulp.task('css', function() {
      new Logger('Injecting css into our html');

      return self._modules.gulp
      .src(config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(config.css, {read: false}), {
        addPrefix: '',
        addSuffix: config.suffix,
        addRootSlash: true
      }))
      .pipe(self._modules.gulp.dest(config.client));
    });
  }

  angularDependencies() {
    let self = this;

    this._modules
    .gulp.task('angular-dependencies', function() {
      new Logger('Injecting Angular 2 Modules into our html');
      return self._modules.gulp
      .src(config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(config.angularDependencies, {read: false}), {
        addPrefix: '',
        addSuffix: config.suffix,
        addRootSlash: true,
        starttag: '<!-- inject:angular-dependencies -->'
      }))
        /*inject it to our client view*/
      .pipe(self._modules.gulp.dest(config.client));
    });
  }
}
