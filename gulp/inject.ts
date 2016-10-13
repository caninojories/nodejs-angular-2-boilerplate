import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as gulp  from '../gulp.config';

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
      return new Promise<any>((resolve, reject) => {
        this._modules
        .runsequence(
          'js',
          'angular-dependencies',
          'css', function() {
            new Logger('Inject task Finished...');
            resolve();
        });
      });
    });
  }

  js() {
    let self = this;

    this._modules
    .gulp.task('js', _ => {
      new Logger('Injecting js into our html');

      return self._modules.gulp
      .src(gulp.config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.js, {read: false}), {
        addPrefix: '',
        addSuffix: gulp.config.suffix,
        addRootSlash: true
      }))
      /*inject it to our client view*/
      .pipe(self._modules.gulp.dest(gulp.config.client));
    });
  }

  css() {
    let self = this;

    this._modules
    .gulp.task('css', function() {
      new Logger('Injecting css into our html');

      return self._modules.gulp
      .src(gulp.config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.css, {read: false}), {
        addPrefix: '',
        addSuffix: gulp.config.suffix,
        addRootSlash: true
      }))
      .pipe(self._modules.gulp.dest(gulp.config.client));
    });
  }

  angularDependencies() {
    let self = this;

    this._modules
    .gulp.task('angular-dependencies', function() {
      new Logger('Injecting Angular 2 Modules into our html');
      return self._modules.gulp
      .src(gulp.config.index)
      .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.angularDependencies, {read: false}), {
        addPrefix: '',
        addSuffix: gulp.config.suffix,
        addRootSlash: true,
        starttag: '<!-- inject:angular-dependencies -->'
      }))
        /*inject it to our client view*/
      .pipe(self._modules.gulp.dest(gulp.config.client));
    });
  }
}
