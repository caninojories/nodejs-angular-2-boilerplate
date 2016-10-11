(function() {
  'use strict';

  let path    = require('path');
  let root    = path.normalize(__dirname);

  module.exports = function() {
    /*
     * wiredep and bower settings
     */
   let version = ''
   let bower = {
     json : require('./bower.json'),
     ignorePath: '../bower',
     directory  : 'bower',
     exclude    : [],
     fileTypes : {
        html: {
          replace: {
            js  : '<script src="/bower{{filePath}}' + version + '"></script>',
            css : '<link rel="stylesheet" href="/bower{{filePath}}' + version + '"/>'
          }
        }
      }
   };

   var config = {
     index  : 'app/index.html',
     assetsBowerJS : [
       root + '/bower/**/*.js'
     ],
     assetsJS     : [
       root + '/assets/**/*.js'
     ],
     assetsAppTS : [
       root + '/app/**/*.js'
     ],
     css    : [
       'assets/css/bootstrap.css',
     ],
     /*inject*/
     js     : [
       'assets/js/system.config.js'
     ],
     angularDependencies: [
       'node_modules/core-js/client/shim.min.js',
       'node_modules/zone.js/dist/zone.min.js',
       'node_modules/reflect-metadata/Reflect.js',
       'node_modules/systemjs/dist/system.src.js'
     ],
     /*end inject*/
     less   : [
       root + '/app/**/*.less',
       root + '/assets/**/*.less'
     ],
     html   : [
       root + '/app/**/*.html'
     ],
     client : 'app/',
     suffix : version
   };

   config.getWireDepDefaultOptions = function() {
     var options = {
       bowerJson : bower.json,
       directory : bower.directory,
       exclude   : bower.exclude,
       ignorePath: bower.ignorePath,
       fileTypes : bower.fileTypes,
     };

     return options;
   };

   return config;
 }
}());
