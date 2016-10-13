"use strict";
var loopromise_1 = require('./loopromise');
var modules_1 = require('../appconfig/modules');
var logger_1 = require('./logger');
var Deploy = (function () {
    function Deploy() {
        this._modules = modules_1.Modules.get();
        this._globalSpwan = null;
        this._globalChildProcess = require('child_process').spawn;
        /**
         * Install global here
         */
        this._global = ['nodemon', 'typings', 'typescript', 'bower', 'pm2', 'gulp'];
        this._globalCounter = 0;
        this.init();
    }
    Deploy.prototype.init = function () {
        var _this = this;
        if (this._modules.args.compile) {
            this.general();
            return;
        }
        var self = this;
        new loopromise_1.LooPromise().init(function () {
            return self._global.length > self._globalCounter;
        }, function () {
            return new Promise(function (resolve, reject) {
                new logger_1.Logger('deploy.ts[back/services][39]', 'Installing ' + self._global[self._globalCounter], 'info');
                self._globalSpwan = self._globalChildProcess('npm', ['install', self._global[self._globalCounter], '-g']);
                self._globalSpwan.stdout.on('data', function (data) {
                    console.log("stdout: " + data);
                });
                self._globalSpwan.stderr.on('data', function (data) {
                    console.log("stderr: " + data);
                });
                self._globalSpwan.on('close', function (code) {
                    new logger_1.Logger('deploy.ts[back/services][54]', 'Successfully Installed ' + self._global[self._globalCounter], 'info');
                    self._globalSpwan.kill();
                    self._globalCounter++;
                    resolve();
                });
            });
        })
            .then(function (response) {
            return _this.gulpcommands();
        })
            .then(function (response) {
            return _this.general();
        })
            .then(function (response) {
            new logger_1.Logger('deploy.ts[back/services][66]', 'Success', 'info');
        });
    };
    Deploy.prototype.gulpcommands = function () {
        var gulpSpwan = null;
        var gulpChildProcess = require('child_process').spawn;
        var settings = ['settings'];
        var settingsCounter = 0;
        var self = this;
        return new Promise(function (rootResolve, rootReject) {
            new loopromise_1.LooPromise().init(function () {
                return settings.length > settingsCounter;
            }, function () {
                return new Promise(function (resolve, reject) {
                    new logger_1.Logger('deploy.ts[back/services][85]', 'Running the command ' + settings[settingsCounter], 'info');
                    gulpSpwan = gulpChildProcess('gulp', [settings[settingsCounter], '--env=' + self._modules.args.env]);
                    gulpSpwan.stdout.on('data', function (data) {
                        console.log("stdout: " + data);
                    });
                    gulpSpwan.stderr.on('data', function (data) {
                        console.log("stderr: " + data);
                    });
                    gulpSpwan.on('close', function (code) {
                        new logger_1.Logger('deploy.ts[back/services][100]', 'Successfully run the command ' + settings[settingsCounter], 'info');
                        gulpSpwan.kill();
                        settingsCounter++;
                        resolve();
                    });
                });
            })
                .then(function (response) {
                rootResolve();
            });
        });
    };
    Deploy.prototype.general = function () {
        var generalSpawn = null;
        var generalCounter = 0;
        var generalSpawnChildProcess = require('child_process').spawn;
        var general = [{
                command: 'tsc'
            }, {
                command: 'gulp',
                args: 'less-compile-and-minify'
            }, {
                command: 'gulp',
                args: 'uglify-assets-assets-js'
            }, {
                command: 'gulp',
                args: 'uglify-assets-app-ts'
            }, {
                command: 'gulp',
                args: 'uglify-html'
            }];
        return new Promise(function (rootResolve, rootReject) {
            new loopromise_1.LooPromise().init(function () {
                return general.length > generalCounter;
            }, function () {
                return new Promise(function (resolve, reject) {
                    if (general[generalCounter].args) {
                        generalSpawn = generalSpawnChildProcess(general[generalCounter].command, [general[generalCounter].args]);
                    }
                    else {
                        generalSpawn = generalSpawnChildProcess(general[generalCounter].command);
                    }
                    new logger_1.Logger('deploy.ts[back/services][143]', ('Running the command ' + general[generalCounter].command + (general[generalCounter].args ? ' ' + general[generalCounter].args : '')), 'info');
                    generalSpawn.stdout.on('data', function (data) {
                        console.log("stdout: " + data);
                    });
                    generalSpawn.stderr.on('data', function (data) {
                        console.log("stderr: " + data);
                    });
                    generalSpawn.on('close', function (code) {
                        new logger_1.Logger('deploy.ts[back/services][157]', ('Successfully run the command ' + general[generalCounter].command + (general[generalCounter].args ? ' with option ' + general[generalCounter - 1].args : '')), 'info');
                        generalSpawn.kill();
                        generalCounter++;
                        resolve();
                    });
                });
            })
                .then(function (response) {
                rootResolve();
            });
        });
    };
    return Deploy;
}());
exports.Deploy = Deploy;
new Deploy();
//# sourceMappingURL=deploy.js.map