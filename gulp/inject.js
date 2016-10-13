"use strict";
var modules_1 = require('./modules');
var logger_1 = require('./utilities/logger');
var gulp = require('../gulp.config');
var Inject = (function () {
    function Inject() {
        this._modules = modules_1.Modules.get();
        this.js();
        this.css();
        this.angularDependencies();
        this.init();
    }
    Inject.prototype.init = function () {
        var _this = this;
        this._modules
            .gulp.task('inject', function (_) {
            new logger_1.Logger('Wire up .css and .js into the html');
            return new Promise(function (resolve, reject) {
                _this._modules
                    .runsequence('js', 'angular-dependencies', 'css', function () {
                    new logger_1.Logger('Inject task Finished...');
                    resolve();
                });
            });
        });
    };
    Inject.prototype.js = function () {
        var self = this;
        this._modules
            .gulp.task('js', function (_) {
            new logger_1.Logger('Injecting js into our html');
            return self._modules.gulp
                .src(gulp.config.index)
                .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.js, { read: false }), {
                addPrefix: '',
                addSuffix: gulp.config.suffix,
                addRootSlash: true
            }))
                .pipe(self._modules.gulp.dest(gulp.config.client));
        });
    };
    Inject.prototype.css = function () {
        var self = this;
        this._modules
            .gulp.task('css', function () {
            new logger_1.Logger('Injecting css into our html');
            return self._modules.gulp
                .src(gulp.config.index)
                .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.css, { read: false }), {
                addPrefix: '',
                addSuffix: gulp.config.suffix,
                addRootSlash: true
            }))
                .pipe(self._modules.gulp.dest(gulp.config.client));
        });
    };
    Inject.prototype.angularDependencies = function () {
        var self = this;
        this._modules
            .gulp.task('angular-dependencies', function () {
            new logger_1.Logger('Injecting Angular 2 Modules into our html');
            return self._modules.gulp
                .src(gulp.config.index)
                .pipe(self._modules.$.inject(self._modules.gulp.src(gulp.config.angularDependencies, { read: false }), {
                addPrefix: '',
                addSuffix: gulp.config.suffix,
                addRootSlash: true,
                starttag: '<!-- inject:angular-dependencies -->'
            }))
                .pipe(self._modules.gulp.dest(gulp.config.client));
        });
    };
    return Inject;
}());
exports.Inject = Inject;
//# sourceMappingURL=inject.js.map