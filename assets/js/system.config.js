/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        '/app', // 'dist',
    '@angular':                   '/node_modules/@angular',
    'rxjs':                       '/node_modules/rxjs',
    'ng2-translate':              '/node_modules/ng2-translate/bundles'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-translate':              { main: 'index.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
     'common',
     'compiler',
     'core',
     'http',
     'platform-browser',
     'platform-browser-dynamic',
     'forms',
     'router'
  ];
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
