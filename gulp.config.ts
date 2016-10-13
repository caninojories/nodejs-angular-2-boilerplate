import * as Const from './back/appconfig/const';
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

export let config = {
  index  : 'app/index.html',
  assetsBowerJS : [
    Const.root + 'bower/**/*.js'
  ],
  assetsJS     : [
    Const.root + 'assets/**/*.js'
  ],
  assetsAppTS : [
    Const.root + 'app/**/*.js',
    Const.root + 'node_modules/ng2-translate/bundles/*.js',
    Const.root + 'node_modules/rxjs/**/*.js',
    Const.root + 'node_modules/@angular/**/*.min.js'
  ],
  /*inject css*/
  css    : [
    'assets/css/bootstrap.css',
  ],
  /*inject js*/
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
    Const.root + 'app/**/*.less',
    Const.root + 'assets/**/*.less'
  ],
  html   : {
    files: [
      Const.root + 'app/**/*.html'
    ],
    ignore: [Const.root + 'app/**/min.*.html']
  },
  client : 'app/',
  suffix : version,
  getWireDepDefaultOptions : function() {
    var options = {
      bowerJson : bower.json,
      directory : bower.directory,
      exclude   : bower.exclude,
      ignorePath: bower.ignorePath,
      fileTypes : bower.fileTypes,
    };

    return options;
  }
};
