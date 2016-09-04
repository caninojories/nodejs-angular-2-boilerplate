(function() {
	'use strict';

	let  fs 	= require('fs');
	let args	= require('yargs').argv;

	module.exports = function(require) {
		let min = 'min.';
		if (args.env === 'QA' || args.env === 'DEV') {
			min = '';
		}

		require.gulp.task('settings', function(done) {
			fs.writeFile('app/shared/config.ts',
			'export let CONFIG = {' +
				'"HOSTNAME": "' + process.env.LIVEDEALDERFRONTHOSTNAME + '",' +
				'"MIN": "' + min + '",' +
        '"SOCKETSERVERPORT": "' + process.env.LIVEDEALDERSOCKETSERVERPORT + '",' +
				'"SOCKETSERVER": "' + process.env.LIVEDEALDERSOCKETSERVER + '"}'
				, 'utf8');

			fs.mkdir('less', function() {
				fs.writeFile('less/app.less',`
					@imageBaseUrl: "";
				`, 'utf8');
			});
		});
	}
}());
