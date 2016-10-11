import * as args from 'yargs';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import * as $ from 'gulp-load-plugins';
import * as gulp from 'gulp';
import * as runsequence from 'run-sequence';
import * as glob from 'glob';
import * as wiredep from 'wiredep';

let lazypipe = require('lazypipe');
let LessPluginAutoPrefix  = require('less-plugin-autoprefix');

export class Modules {
  constructor() {}

  static get() {
    return {
      args: args.argv,
      fs  : fs,
      url : url,
      $   : <any> $({lazy: true}),
      glob: glob,
      gulp: gulp,
      lazypipe: <any> lazypipe,
      runsequence: runsequence,
      autoprefix: new LessPluginAutoPrefix({ browsers: ["last 2 versions"] }),
      wiredep: <any> wiredep.stream
    }
  }
}
