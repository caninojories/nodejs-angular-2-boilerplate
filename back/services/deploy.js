(function() {
  'use strict';

  let args        = require('yargs').argv;
  let loopPromise = require('./loopPromise');


  let globalSpwan = null;
  let globalChildProcess = require('child_process').spawn;
  /**
   * Install global here
   */
  let global        = ['nodemon', 'typings', 'typescript', 'bower', 'pm2', 'gulp']
  let globalCounter = 0;

  if (args.compile) {
    GENERAL();

    return;
  }

  loopPromise(function() {
    return global.length > globalCounter;
  }, function() {
    return new Promise((resolve, reject) => {
      globalSpwan = globalChildProcess('npm', ['install', global[globalCounter], '-g']);

      globalSpwan.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      globalSpwan.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      globalSpwan.on('close', (code) => {
        globalSpwan.kill();
        console.log(`child process exited with code ${code}`);
        globalCounter++;
        resolve();
      });
    })
    .then(response => {
      console.log('Finish Installing ' + global[globalCounter - 1]);
    })
  })
  .then(response => {
    return GULPCOMMANDS();
  })
  .then(response => {
    return GENERAL();
  })
  .then(response => {
    console.log("DONEEEEEEEEEEEEEEEEEEEEEEEEE");
  });


  function GULPCOMMANDS() {
    let gulpSpwan         = null;
    let gulpChildProcess  = require('child_process').spawn;
    let settings          = ['settings'];
    let settingsCounter   = 0;

    return new Promise((rootResolve, rootReject) => {
      loopPromise(function() {
        return settings.length > settingsCounter;
      }, function() {
        return new Promise((resolve, reject) => {
          gulpSpwan = gulpChildProcess('gulp', [settings[settingsCounter], '--env=' + args.env]);

          gulpSpwan.stdout.on('data', (data) => {
             console.log(`stdout: ${data}`);
           });

           gulpSpwan.stderr.on('data', (data) => {
             console.log(`stderr: ${data}`);
           });

           gulpSpwan.on('close', (code) => {
             gulpSpwan.kill();
             settingsCounter++;
             console.log(`child process exited with code ${code}`);
             resolve();
           });
        })
        .then(response => {
          console.log('Finish running the command ' + settings[settingsCounter - 1]);
        })
      })
      .then(response => {
        rootResolve();
      });
    });
  }

  function GENERAL() {
    let generalSpawn = null;
    let generalSpawnChildProcess = require('child_process').spawn;
    let general = [{
      command : 'tsc'
    }, {
      command: 'gulp',
      args: 'less-compile-and-uglify'
    }, {
      command: 'gulp',
      args: 'uglify-assets-assets-js'
    }, {
      command: 'gulp',
      args: 'uglify-assets-app-ts'
    }, {
      command: 'gulp',
      args: 'uglify-html'
    }];
    let generalCounter = 0;

    return new Promise((rootResolve, rootReject) => {
      loopPromise(function() {
        return general.length > generalCounter;
      }, function() {
        return new Promise((resolve, reject) => {
          if (general[generalCounter].args) {
            generalSpawn = generalSpawnChildProcess(general[generalCounter].command, [general[generalCounter].args]);
          } else {
            generalSpawn = generalSpawnChildProcess(general[generalCounter].command);
          }

          generalSpawn.stdout.on('data', (data) => {
             console.log(`stdout: ${data}`);
           });

           generalSpawn.stderr.on('data', (data) => {
             console.log(`stderr: ${data}`);
           });

           generalSpawn.on('close', (code) => {
             generalSpawn.kill();
             generalCounter++;
             console.log(`child process exited with code ${code}`);
             resolve();
           });
        })
        .then(response => {
          console.log('Finish running the command ' + general[generalCounter - 1].command + ' with option ' + general[generalCounter - 1].args)
        })
      })
      .then(response => {
        rootResolve();
      })
    });
  }
}());
