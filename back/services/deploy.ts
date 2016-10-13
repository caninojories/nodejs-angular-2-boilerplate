
import {
  LooPromise
} from './loopromise';
import {
  Modules
} from '../appconfig/modules';
import {
  Logger
} from './logger';

export class Deploy {
  constructor() {
    this.init();
  }

  private _modules      = Modules.get();
  private _globalSpwan  = null;
  private _globalChildProcess = require('child_process').spawn;
  /**
   * Install global here
   */
  private _global        = ['nodemon', 'typings', 'typescript', 'bower', 'pm2', 'gulp'];
  private _globalCounter = 0;

  init() {
    if (this._modules.args.compile) {
      this.general();

      return;
    }

    let self = this;

    new LooPromise().init(function() {
      return self._global.length > self._globalCounter;
    }, function() {
      return new Promise((resolve, reject) => {
        new Logger('deploy.ts[back/services][39]', 'Installing ' + self._global[self._globalCounter], 'info');

        self._globalSpwan = self._globalChildProcess('npm', ['install', self._global[self._globalCounter], '-g']);

        self._globalSpwan.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        self._globalSpwan.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        self._globalSpwan.on('close', (code) => {
          new Logger('deploy.ts[back/services][54]', 'Successfully Installed ' + self._global[self._globalCounter], 'info');
          self._globalSpwan.kill();
          self._globalCounter++;
          resolve();
        });
      });
    })
    .then(response => {

      return this.gulpcommands();
    })
    .then(response => {

      return this.general();
    })
    .then(response => {

      new Logger('deploy.ts[back/services][66]', 'Success', 'info');
    });
  }

  gulpcommands() {
    let gulpSpwan         = null;
    let gulpChildProcess  = require('child_process').spawn;
    let settings          = ['settings'];
    let settingsCounter   = 0;
    let self              = this;

    return new Promise((rootResolve, rootReject) => {
      new LooPromise().init(function() {
        return settings.length > settingsCounter;
      }, function() {
        return new Promise((resolve, reject) => {
          new Logger('deploy.ts[back/services][85]', 'Running the command ' + settings[settingsCounter], 'info');

          gulpSpwan = gulpChildProcess('gulp', [settings[settingsCounter], '--env=' + self._modules.args.env]);

          gulpSpwan.stdout.on('data', (data) => {
             console.log(`stdout: ${data}`);
           });

           gulpSpwan.stderr.on('data', (data) => {
             console.log(`stderr: ${data}`);
           });

           gulpSpwan.on('close', (code) => {
             new Logger('deploy.ts[back/services][100]', 'Successfully run the command ' + settings[settingsCounter], 'info');
             gulpSpwan.kill();
             settingsCounter++;
             resolve();
           });
        });
      })
      .then(response => {
        rootResolve();
      });
    });
  }

  general() {
    let generalSpawn    = null;
    let generalCounter  = 0;
    let generalSpawnChildProcess = require('child_process').spawn;

    let general : any = [{
      command : 'tsc'
    }, {
      command: 'gulp',
      args: 'less-compile-and-minify'
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

    return new Promise((rootResolve, rootReject) => {
      new LooPromise().init(function() {
        return general.length > generalCounter;
      }, function() {
        return new Promise((resolve, reject) => {
          if (general[generalCounter].args) {
            generalSpawn = generalSpawnChildProcess(general[generalCounter].command, [general[generalCounter].args]);
          } else {
            generalSpawn = generalSpawnChildProcess(general[generalCounter].command);
          }

          new Logger('deploy.ts[back/services][143]', ('Running the command ' + general[generalCounter].command + (general[generalCounter].args ? ' ' + general[generalCounter].args : '')), 'info');

          generalSpawn.stdout.on('data', (data) => {
             console.log(`stdout: ${data}`);
           });

           generalSpawn.stderr.on('data', (data) => {
             console.log(`stderr: ${data}`);
           });

           generalSpawn.on('close', (code) => {
             new Logger('deploy.ts[back/services][157]', ('Successfully run the command ' + general[generalCounter].command + (general[generalCounter].args ? ' with option ' + general[generalCounter - 1].args : '')), 'info');
             generalSpawn.kill();
             generalCounter++;
             resolve();
           });
        });
      })
      .then(response => {

        rootResolve();
      })
    });
  }
}

new Deploy();
