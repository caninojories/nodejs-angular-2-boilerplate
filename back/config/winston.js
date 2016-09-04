(function() {
	'use strict';

	module.exports = function() {
		return new(io.winston.Logger)({
		  transports: [
		    new (io.winston.transports.Console)({
		      timestamp: function() {
		        return io.moment(new Date()).format('MMM Do YY hh:mm:ss A');
		      },
					prettyPrint: true,
		      formatter: function(options) {
						let levelColor = 'green';
						if (options.level === 'warn') {
							levelColor = 'yellow';
						} else if(options.level === 'error') {
							levelColor = 'red';
						}
		        return io.chalk.magenta(options.meta.file) + ':' + io.chalk[levelColor](options.level.toUpperCase()) + ':' + io.chalk.blue(options.timestamp()) +
		          (options.meta && Object.keys(options.meta).length ? '  ---->  '+ io.chalk.cyan(JSON.stringify(options.meta.message)) : '' );
		      }
		    })
		  ]
		});
	}
}());
