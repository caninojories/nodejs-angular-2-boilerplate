import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import * as $ from 'gulp-load-plugins';
import * as gulp from 'gulp';
let lazypipe = require('lazypipe');

export class Modules {
  constructor() {
    // console.log($().useref());
  }

  static get() {
    return {
      fs  : fs,
      url : url,
      $   : <any> $({lazy: true}),
      gulp: gulp,
      lazypipe: <any> lazypipe
    }
  }
}
