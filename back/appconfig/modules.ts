import * as path from 'path';
import * as args from 'yargs';
import * as bodyparser from 'body-parser';
import * as chalk from 'chalk';
import * as compression from 'compression';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as fs from 'fs';
import * as jwtsimple from 'jwt-simple';
import * as methodoverride from 'method-override';
import * as moment from 'moment';
import * as morgan from 'morgan';
import * as servestatic from 'serve-static';
import * as url from 'url';
import * as winston from 'winston';

export class Modules {
  constructor() {}

  static get() {
    return {
      args          : args.argv,
      bodyparser    : bodyparser,
      chalk         : chalk,
      compression   : compression,
      express       : express,
      fs            : fs,
      path          : path,
      jwtsimple     : jwtsimple,
      methodoverride: methodoverride,
      moment        : moment,
      morgan        : morgan,
      servestatic   : servestatic,
      url           : url,
      winston       : winston
    }
  }
}
