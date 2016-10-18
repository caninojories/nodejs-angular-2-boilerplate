import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as gulp  from '../gulp.config';

export class Useref  {
  constructor() {
    this.init();
  }

  init() {
    Modules
    .get()
    .gulp
    .task('useref', _ => {
      new Logger('Running useref');

      return Modules
      .get()
      .gulp
      .src(gulp.config().index)
      .pipe(Modules.get().$.useref({
        searchPath: [''],
        base: process.cwd(),
        transformPath: (filePath) => {
          let path = filePath.replace('app//', '');
          return path;
        }
      }))
      .pipe(Modules.get().$.if('*.js', Modules.get().$.uglify({
        mangle: false,
        output: {
          bracketize: true
        },
        compressor: {
          properties: false,
          booleans: false
        }
      })))
      .pipe(Modules.get().$.if('*.css', Modules.get().$.cleanCss({compatibility: 'ie8'})))
      .pipe(Modules.get().gulp.dest('dist'))
    });
  }
}
