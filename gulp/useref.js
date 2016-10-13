"use strict";
var modules_1 = require('./modules');
var logger_1 = require('./utilities/logger');
var gulp = require('../gulp.config');
var Useref = (function () {
    function Useref() {
        this.init();
    }
    Useref.prototype.init = function () {
        modules_1.Modules
            .get()
            .gulp
            .task('useref', function (_) {
            new logger_1.Logger('Running useref');
            return modules_1.Modules
                .get()
                .gulp
                .src(gulp.config.index)
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
    return Useref;
}());
exports.Useref = Useref;
//# sourceMappingURL=useref.js.map