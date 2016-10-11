"use strict";
var inject_1 = require('./gulp/inject');
var less_compile_minify_1 = require('./gulp/less.compile.minify');
var less_watch_1 = require('./gulp/less.watch');
var settings_1 = require('./gulp/settings');
var uglify_1 = require('./gulp/uglify');
var wiredep_1 = require('./gulp/wiredep');
var html_min_1 = require('./gulp/html.min');
var useref_1 = require('./gulp/useref');
var dev_1 = require('./gulp/dev');
var prod_1 = require('./gulp/prod');
var GulpFile = (function () {
    function GulpFile() {
        this._dev = new dev_1.Dev();
        this._prod = new prod_1.Prod();
        this._inject = new inject_1.Inject();
        this._lessWatch = new less_watch_1.LessWatch();
        this._settings = new settings_1.Settings();
        this._uglify = new uglify_1.Uglify();
        this._wiredep = new wiredep_1.Wiredep();
        this._htmlMin = new html_min_1.HtmlMin();
        this._useref = new useref_1.Useref();
        this._lessCompileAndMinify = new less_compile_minify_1.LessCompileAndMinify();
    }
    return GulpFile;
}());
exports.GulpFile = GulpFile;
new GulpFile();
//# sourceMappingURL=gulpfile.js.map