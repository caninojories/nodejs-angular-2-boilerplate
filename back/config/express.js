(function() {
  'use strict';

  /*Express Configuration*/
  module.exports = function(app) {
    let root = io.path.normalize(__dirname + '/../../');

    app.set('views', root + 'dist');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.set('x-powered-by', false);
    app.set('port', io.port);
    app.use(io.compression());
    app.use(io.favicon(io.faviconPath));
    app.use(io.morgan('dev'));
    app.use(io.bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    }));
    app.use(io.bodyParser.json({
      limit: '50mb'
    }));
    app.use(io.bodyParser.raw({
      limit: '50mb',
      type: '*/*'
    }));
    app.use(io.methodOverride(function(req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));

    if (process.env.NODE_ENV === 'production' || io.args.env === 'PRODUCTION') {
      app.use('/app', io.serveStatic(root + 'app', {
        maxAge: '1d',
        etag: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }));
      app.use('/bower', io.serveStatic(root + 'bower', {
        maxAge: '1d',
        etag: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }));
      app.use('/node_modules', io.serveStatic(root + 'node_modules', {
        maxAge: '1d',
        etag: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }));
      app.use('/assets', io.serveStatic(root + 'assets', {
        maxAge: '1d',
        etag: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }));

      app.use('/assets', io.serveStatic(root + 'dist/assets', {
        maxAge: '1d',
        etag: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }));
    } else {
      app.use('/app', io.serveStatic(root + 'app', {
        maxAge: '0d'
      }));
      app.use('/bower', io.serveStatic(root + 'bower', {
        maxAge: '0d'
      }));
      app.use('/node_modules', io.serveStatic(root + 'node_modules', {
        maxAge: '0d'
      }));
      app.use('/assets', io.serveStatic(root + 'assets', {
        maxAge: '0d'
      }));
      app.use('/fonts', io.serveStatic(root + 'assets', {
        maxAge: '0d'
      }));
    }

    // /*Setup for CORS*/
    app.all(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'false');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      next();
    });
  };
}());
