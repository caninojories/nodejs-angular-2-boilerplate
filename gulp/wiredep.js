"use strict";
var modules_1 = require('./modules');
var logger_1 = require('./utilities/logger');
var config = require('./../gulp.config')();
var Wiredep = (function () {
    function Wiredep() {
        this._modules = modules_1.Modules.get();
        this.init();
    }
    Wiredep.prototype.init = function () {
        var self = this;
        var options = config.getWireDepDefaultOptions();
        this._modules.gulp.task('wiredep', function () {
            new logger_1.Logger('Wire up our js css and app.js into our html');
            return self._modules.gulp
                .src(config.index)
                .pipe(self._modules.wiredep(options))
                .pipe(self._modules.gulp.dest(config.client));
        });
    };
    return Wiredep;
}());
exports.Wiredep = Wiredep;
//# sourceMappingURL=wiredep.js.map