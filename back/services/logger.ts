import {Modules} from '../config/modules';

export class Logger {
	private _modules = Modules.get();

	constructor(private file, private message, private type) {
		if (this.type === 'error' && this._modules.args.env === 'PRODUCTION' || this._modules.args.env === 'DEV') {
			this.logs()[this.type]({
				file: file,
				message: message
			});
		}
	}

	logs() {
		let self = this;
		return new(this._modules.winston.Logger)({
			transports: [
				new (self._modules.winston.transports.Console)({
					timestamp: function() {
						return self._modules.moment().format('MMM Do YY hh:mm:ss A');
					},
					prettyPrint: true,
					formatter: function(options) {
						let levelColor = 'green';
						if (options.level === 'warn') {
							levelColor = 'yellow';
						} else if(options.level === 'error') {
							levelColor = 'red';
						}
						return self._modules.chalk.magenta(options.meta.file) + ':' + self._modules.chalk[levelColor](options.level.toUpperCase()) + ':' + self._modules.chalk.blue(options.timestamp()) +
							(options.meta && Object.keys(options.meta).length ? '  ---->  '+ self._modules.chalk.cyan(JSON.stringify(options.meta.message)) : '' );
					}
				})
			]
		})
	}
}
