"use strict";
var modules_1 = require('./modules');
var logger_1 = require('./utilities/logger');
/**
 * gulp settings --env=[DEV | PRODUCTION]
 * --env is optional
 * default is DEV
 */
var Settings = (function () {
    function Settings() {
        this._modules = modules_1.Modules.get();
        this.init();
    }
    Settings.prototype.init = function () {
        var _this = this;
        var self = this;
        var min = 'min.';
        var env = 'PRODUCTION';
        this._modules
            .gulp.task('settings', function (done) {
            return new Promise(function (resolve, reject) {
                if ((_this._modules.args.env === 'QA' || _this._modules.args.env === 'DEV' || !_this._modules.args.env) && process.env.NODE_ENV !== 'PRODUCTION') {
                    min = '';
                    env = 'DEV';
                }
                self._modules.fs.writeFile('app/shared/config.ts', 'export let CONFIG = {' +
                    '"HOSTNAME": "' + (process.env.LIVEDEALDERFRONTHOSTNAME || 'api ip here or domain') + '",' +
                    '"HOSTNAMEPORT": "' + (process.env.LIVEDEALDERHOSTNAMEPORT || 'api port here') + '",' +
                    '"HOSTNAMEVERSION": "' + (process.env.LIVEDEALDERHOSTNAMEVERSION || '/api/v1/') + '",' +
                    '"MIN": "' + min + '",' +
                    '"ENV": "' + env + '",' +
                    '"SOCKETSERVERPORT": "' + process.env.LIVEDEALDERSOCKETSERVERPORT + '",' +
                    '"SOCKETSERVER": "' + process.env.LIVEDEALDERSOCKETSERVER + '"}', 'utf8');
                /* check if app.less is exist */
                self._modules.fs.exists('less/app.less', function (exist) {
                    if (!exist) {
                        self._modules.fs.mkdir('less', function () {
                            self._modules.fs.writeFile('less/app.less', "\n                /**\n                 * for override less configuration\n                 */\n              ", 'utf8');
                        });
                        new logger_1.Logger('Finish Settings');
                        resolve('success');
                    }
                    else {
                        new logger_1.Logger('Finish Settings');
                        resolve('success');
                    }
                });
            });
        });
    };
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map