(function() {
  'use strict';

  let path    = require('path'),
      args    = require('yargs').argv,
      root    = path.normalize(__dirname + '/../../');

  module.exports = {
    root              : root,

    args              : args,
    bodyParser        : require('body-parser'),
    chalk             : require('chalk'),
    cluster           : require('cluster'),
    compression       : require('compression'),
    express           : require('express'),
    favicon           : require('serve-favicon'),
    fs                : require('fs'),
    jwt               : require('jwt-simple'),
    morgan            : require('morgan'),
    methodOverride    : require('method-override'),
    numCPUs           : require('os').cpus().length,
    path              : require('path'),
    serveStatic       : require('serve-static'),
    url               : require('url'),
    winston           : require('winston'),
    _                 : require('lodash'),
    logger            : require('./winston'),

    port              : process.env.PORT || args.port || 8116,
    environment       : process.env.NODE_ENV || 'development',
    faviconPath       : 'app/favicon.ico',
    apiVersion        : '/api_v1/',

    /*Services*/
    xPoweredBy        : require(root + 'back/services/xPoweredBy'),
  };
}());
