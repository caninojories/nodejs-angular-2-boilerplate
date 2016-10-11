import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();

export class HtmlMin {
  constructor() {
    this.init();
  }

  private _modules = Modules.get();

  init() {
    let self = this;

    this._modules.gulp.task('html-min', _ => {
      new Logger('Uglifying ---> HTML');

      config.html.forEach(function(file) {
        self._modules.glob(file, {}, function (er, files) {
          files.forEach(function(item) {
            if (item.indexOf('min') !== -1) {
              return;
            }

            let lastOccurence = item.lastIndexOf('/');
            let pathPosition  = item.substr(0, lastOccurence);
            let name          = item.substr(lastOccurence + 1, file.length);

            return self._modules.gulp.src(item)
            .pipe(self._modules.$.htmlmin({
              collapseWhitespace: true,
              removeComments: true,
              caseSensitive: true
            }))
            .pipe(self._modules.$.rename('min.' + name))
            .pipe(self._modules.gulp.dest(pathPosition));
          });
        });
      });
    })
  }
}
