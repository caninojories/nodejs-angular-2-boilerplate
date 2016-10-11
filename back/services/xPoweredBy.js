"use strict";
var XpoweredBy = (function () {
    function XpoweredBy() {
    }
    XpoweredBy.prototype.init = function (req, res, next) {
        res.removeHeader('X-Powered-By');
        next();
    };
    ;
    return XpoweredBy;
}());
exports.XpoweredBy = XpoweredBy;
//# sourceMappingURL=xpoweredby.js.map