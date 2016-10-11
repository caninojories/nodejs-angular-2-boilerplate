"use strict";
var path = require('path');
var args = require('yargs');
var bodyparser = require('body-parser');
var chalk = require('chalk');
var compression = require('compression');
var express = require('express');
var fs = require('fs');
var jwtsimple = require('jwt-simple');
var methodoverride = require('method-override');
var moment = require('moment');
var morgan = require('morgan');
var servestatic = require('serve-static');
var url = require('url');
var winston = require('winston');
var Modules = (function () {
    function Modules() {
    }
    Modules.get = function () {
        return {
            args: args.argv,
            bodyparser: bodyparser,
            chalk: chalk,
            compression: compression,
            express: express,
            fs: fs,
            path: path,
            jwtsimple: jwtsimple,
            methodoverride: methodoverride,
            moment: moment,
            morgan: morgan,
            servestatic: servestatic,
            url: url,
            winston: winston
        };
    };
    return Modules;
}());
exports.Modules = Modules;
//# sourceMappingURL=modules.js.map