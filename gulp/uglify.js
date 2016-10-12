"use strict";
var modules_1 = require('./modules');
var logger_1 = require('./utilities/logger');
var Errors = require('./utilities/errors');
var config = require('./../gulp.config')();
var Uglify = (function () {
    function Uglify() {
        this._modules = modules_1.Modules.get();
        this.assetsJs();
        this.appJs();
        this.init();
    }
    Uglify.prototype.init = function () {
        var _this = this;
        this._modules
            .gulp.task('uglify', function (_) {
            _this._modules
                .runsequence('uglify-assetsJs', 'uglify-appJs', function () {
                return new Promise(function (resolve, reject) {
                    new logger_1.Logger('Finished...');
                    resolve();
                });
            });
        });
    };
    Uglify.prototype.assetsJs = function () {
        var self = this;
        this._modules
            .gulp.task('uglify-assetsJs', function () {
            new logger_1.Logger('Uglifying Assets ---> JS');
            config.assetsJS.forEach(function (file) {
                self._modules.glob(file, {}, function (er, files) {
                    files.forEach(function (item) {
                        if (item.indexOf('min') !== -1) {
                            return;
                        }
                        var lastOccurence = item.lastIndexOf('/');
                        var pathPosition = item.substr(0, lastOccurence);
                        var name = item.substr(lastOccurence + 1, file.length);
                        return self._modules.gulp.src(item)
                            .pipe(self._modules.$.uglify({
                            mangle: false,
                            output: {
                                bracketize: true
                            },
                            compressor: {
                                properties: false,
                                booleans: false
                            }
                        }))
                            .pipe(self._modules.$.rename('min.' + name))
                            .pipe(self._modules.gulp.dest(pathPosition));
                    });
                });
            });
        });
    };
    Uglify.prototype.appJs = function () {
        var self = this;
        this._modules
            .gulp.task('uglify-appJs', function () {
            new logger_1.Logger('Uglifying  Assets-App-TS ---> JS');
            config.assetsAppTS.forEach(function (file) {
                self._modules.glob(file, {}, function (er, files) {
                    files.forEach(function (item) {
                        var position = item.lastIndexOf('/');
                        var dest = item.substr(0, position + 1);
                        return self._modules.gulp.src(item)
                            .pipe(self._modules.$.uglify({
                            mangle: false,
                            output: {
                                bracketize: true
                            },
                            compressor: {
                                properties: false,
                                booleans: false
                            }
                        }))
                            .on('error', Errors)
                            .pipe(self._modules.gulp.dest(dest));
                    });
                });
            });
        });
    };
    return Uglify;
}());
exports.Uglify = Uglify;
//# sourceMappingURL=uglify.js.map