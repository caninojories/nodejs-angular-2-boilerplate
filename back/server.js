(function() {
  'use strict';

  global.appRequire = function(name) {
    return require(__dirname + '/' + name);
  };

  global.io = appRequire('config/modules');
  let index = require('./routes/index');

  /*Start our Express Server*/
  let app = io.express();

  /*Require our Configuration Files*/
  require('./config/express')(app);

  app.use(function(err, req, res, next) {
    io.logger().error({
      file: 'server.js[45]',
      message: err
    });

    res.status(err.status || 500).send({
      message: err.message,
      status: err.status || 500
    });
  });
  app.use('*', index);

  app.listen(io.port, function() {
    console.log(io.chalk.red.reset.underline('listening to port ') +
      io.chalk.cyan.bold((io.port)));
  });

  /*close our connection when the app stop*/
  if (!io.args.mongoRun) {
    return;
  }

  process.on('SIGINT', function() {
    io.mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
}());
