"use strict";
var modules_1 = require('./modules');
var config = require('./../gulp.config')();
var CombineAssets = (function () {
    function CombineAssets() {
        this.init();
    }
    CombineAssets.prototype.init = function () {
        modules_1.Modules
            .get()
            .gulp
            .task('useref', function (_) {
            return modules_1.Modules
                .get()
                .gulp
                .src(config.index)
                .pipe(modules_1.Modules.get().$.useref({
                searchPath: [''],
                base: process.cwd(),
                transformPath: function (filePath) {
                    var path = filePath.replace('app//', '');
                    return path;
                }
            }))
                .pipe(modules_1.Modules.get().$.if('*.js', modules_1.Modules.get().$.uglify()))
                .pipe(modules_1.Modules.get().gulp.dest('dist'));
        });
    };
    return CombineAssets;
}());
exports.CombineAssets = CombineAssets;
//# sourceMappingURL=useref.js.map