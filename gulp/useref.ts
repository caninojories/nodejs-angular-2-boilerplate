import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';

let config = require('./../gulp.config')();

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
      .src(config.index)
      .pipe(Modules.get().$.useref({
        searchPath: [''],
        base: process.cwd(),
        transformPath: (filePath) => {
          let path = filePath.replace('app//', '');
          return path;
        }
      }))
      .pipe(Modules.get().$.if('*.js', Modules.get().$.uglify()))
      .pipe(Modules.get().gulp.dest('dist'))
    });
  }
}
