(function() {
  'use strict';

  let router = io.express.Router();

  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  router.get('/', io.xPoweredBy, function(req, res) {
    if (process.env.NODE_ENV === 'PRODUCTION' || io.args.env === 'PRODUCTION') {
      res.render('index.html')
    } else {
      res.render('index.html')
    }
  });

  module.exports = router;
})();
