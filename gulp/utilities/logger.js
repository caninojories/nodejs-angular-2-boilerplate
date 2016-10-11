"use strict";
var modules_1 = require('../modules');
var Logger = (function () {
    function Logger(_msg) {
        this._msg = _msg;
        this._modules = modules_1.Modules.get();
        this.init();
    }
    Logger.prototype.init = function () {
        if (typeof (this._msg) === 'object') {
            for (var item in this._msg) {
                if (this._msg.hasOwnProperty(item)) {
                    this._modules.$.util.log(this._modules.$.util.colors.blue(this._msg[item]));
                }
            }
        }
        else {
            this._modules.$.util.log(this._modules.$.util.colors.blue(this._msg));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map