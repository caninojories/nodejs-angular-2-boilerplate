"use strict";
var Const = require('./const');
var router = require('../routes');
var logger_1 = require('../services/logger');
var modules_1 = require('./modules');
var ExpressConfig = (function () {
    function ExpressConfig(_app /*express.Application*/, _router /*express.Router*/) {
        this._app = _app;
        this._router = _router;
        this._modules = modules_1.Modules.get();
    }
    ExpressConfig.prototype.loadExpressConfig = function () {
        if (process.env.NODE_ENV === 'production' || this._modules.args.env === 'PRODUCTION') {
            this._app.set('views', Const.root + 'dist');
        }
        else {
            this._app.set('views', Const.root + 'app');
        }
        this._app.set('view engine', 'ejs');
        this._app.engine('html', require('ejs').renderFile);
        this._app.set('x-powered-by', false);
        this._app.set('port', Const.port);
        this._app.use(modules_1.Modules.get().compression());
        this._app.use(modules_1.Modules.get().morgan('dev'));
        this._app.use(modules_1.Modules.get().bodyparser.urlencoded({
            extended: true,
            limit: '50mb'
        }));
        this._app.use(modules_1.Modules.get().bodyparser.json({
            limit: '50mb'
        }));
        this._app.use(modules_1.Modules.get().methodoverride(function (req, res) {
            if (req['body'] && typeof req['body'] === 'object' && '_method' in req['body']) {
                var method = req['body']._method;
                delete req['body']._method;
                return method;
            }
        }));
        if (process.env.NODE_ENV === 'production' || this._modules.args.env === 'PRODUCTION') {
            this._app.use('/app', this._modules.servestatic(Const.root + 'app', {
                maxAge: '1d',
                etag: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            }));
            this._app.use('/bower', this._modules.servestatic(Const.root + 'bower', {
                maxAge: '1d',
                etag: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            }));
            this._app.use('/node_modules', this._modules.servestatic(Const.root + 'node_modules', {
                maxAge: '1d',
                etag: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            }));
            this._app.use('/assets', this._modules.servestatic(Const.root + 'assets', {
                maxAge: '1d',
                etag: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            }));
            this._app.use('/assets', this._modules.servestatic(Const.root + 'dist/assets', {
                maxAge: '1d',
                etag: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            }));
        }
        else {
            this._app.use('/app', this._modules.servestatic(Const.root + 'app', {
                maxAge: '0d'
            }));
            this._app.use('/bower', this._modules.servestatic(Const.root + 'bower', {
                maxAge: '0d'
            }));
            this._app.use('/node_modules', this._modules.servestatic(Const.root + 'node_modules', {
                maxAge: '0d'
            }));
            this._app.use('/assets', this._modules.servestatic(Const.root + 'assets', {
                maxAge: '0d'
            }));
            this._app.use('/fonts', this._modules.servestatic(Const.root + 'assets', {
                maxAge: '0d'
            }));
        }
        /* Setup for CORS */
        this._app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'false');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if ('OPTIONS' == req.method) {
                res.sendStatus(200);
            }
            else {
                next();
            }
        });
    };
    ExpressConfig.prototype.loadExpressMiddleware = function () {
        var _this = this;
        this._app.use('/api/*', function (req, res, next) {
            new logger_1.Logger('express.config.js[112]', 'Not Found Api --> ' + req.originalUrl, 'error');
            next({ message: 'Not Found Api --> ' + req.originalUrl });
        });
        this._app.use(function (err, req, res, next) {
            new logger_1.Logger('express.config.js[50]', err, 'error');
            res.status(err.status || 500).send({
                message: err.message,
                status: err.status || 500
            });
            next();
        });
        // console.log(this._router.get());
        // let router = new Routes().init();
        this._router.use(function timeLog(req, res, next) {
            console.log('Time: ', Date.now());
            next();
        });
        this._router.get('/', function (req, res) {
            res.render('index.html');
        });
        this._app.use('*', router);
        // console.log(router);
        this._app.listen(Const.port, function () {
            console.log(_this._modules.chalk.red.reset.underline('listening to port ') +
                _this._modules.chalk.cyan.bold((Const.port)));
        });
        process.on('SIGINT', function () {
            setTimeout(function () {
                process.exit(0);
            }, 300);
        });
    };
    return ExpressConfig;
}());
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=express.js.map