import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as gulp  from '../gulp.config';

export class Useref  {
  constructor() {
    this.clean();
    this.build();
    this.init();
  }

  private _modules = Modules.get();

  init() {
    this._modules
    .gulp.task('useref', _ => {
      return new Promise<any>((resolve, reject) => {
        this._modules
        .runsequence(
          'clean',
          'build', function() {
            new Logger('Finished...');
            resolve();
        });
      });
    });
  }

  build() {
    let self = this;
    this._modules.gulp
    .task('build', _ => {
      new Logger('Running useref');

      return self._modules.gulp
      .src(gulp.config().index)
      .pipe(self._modules.$.useref({
        searchPath: [''],
        base: process.cwd(),
        transformPath: (filePath) => {
          let path = filePath.replace('app//', '');

          if (!(path.indexOf('bower') !== -1 || path.indexOf('node_modules') !== -1)) {
            path = path.replace('/css/', '/assets/css/');
            path = path.replace('/js/', '/assets/js/');
          }

          return path;
        }
      }))
      .pipe(self._modules.$.if('*.js', self._modules.$.uglify({
        mangle: false,
        output: {
          bracketize: true
        },
        compressor: {
          properties: false,
          booleans: false
        }
      })))
      .pipe(self._modules.$.if('*.css', self._modules.$.cleanCss({compatibility: 'ie8'})))
      .pipe(self._modules.gulp.dest('dist'))
    });
  }

  clean() {
    let self = this;
    this._modules.gulp
    .task('clean', function () {
      return self._modules.gulp
        .src('dist', {read: false})
        .pipe(self._modules.$.clean());
    });
  }
}
