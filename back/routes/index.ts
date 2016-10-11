import * as express from 'express';
import {
  DisableCache
} from '../services/disablecache';

let indexRouter  = express.Router();
indexRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

indexRouter.get('/', function(req, res) {
  res.render('index.html')
});

module.exports = indexRouter;
