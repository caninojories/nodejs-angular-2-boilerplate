import {
  Modules
} from './modules';
import {
  Logger
} from './utilities/logger';
import * as Errors from './utilities/errors';

let config = require('./../gulp.config')();

/**
 * gulp settings --env=[DEV | PRODUCTION]
 * --env is optional
 * default is DEV
 */
export class Settings {
	constructor() {
    this.init();
  }

	private _modules = Modules.get();

	init() {
		let self 	= this;
		let min 	= 'min.';
    let env   = 'PRODUCTION';


		this._modules
		.gulp.task('settings', (done) => {
      if ((this._modules.args.env === 'QA' || this._modules.args.env === 'DEV' || !this._modules.args.env) && process.env.NODE_ENV !== 'PRODUCTION') {
        min = '';
        env = 'DEV'
      }

			self._modules.fs.writeFile('app/shared/config.ts',
			'export let CONFIG = {' +
			'"HOSTNAME": "' + process.env.LIVEDEALDERFRONTHOSTNAME + '",' +
			'"MIN": "' + min + '",' +
      '"ENV": "' + env + '",' +
      '"SOCKETSERVERPORT": "' + process.env.LIVEDEALDERSOCKETSERVERPORT + '",' +
			'"SOCKETSERVER": "' + process.env.LIVEDEALDERSOCKETSERVER + '"}'
			, 'utf8');

      /* check if app.less is exist */
      self._modules.fs.exists('less/app.less', (exist) => {
        if (!exist) {
          self._modules.fs.mkdir('less', function() {
            self._modules.fs.writeFile('less/app.less',`
              /**
               * for override less configuration
               */
            `, 'utf8');
          });
        }
      });
		});
	}
}
