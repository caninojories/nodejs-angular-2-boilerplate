"use strict";
var express = require('express');
var indexRouter = express.Router();
indexRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
indexRouter.get('/', function (req, res) {
    res.render('index.html');
});
module.exports = indexRouter;
//# sourceMappingURL=index.js.map