import {
  Inject
} from './gulp/task.inject';
import {
  LessCompileAndMinify
} from './gulp/task.less.compile.minify';
import {
  LessWatch
} from './gulp/task.less.watch';
import {
  Settings
} from './gulp/task.settings';
import {
  Uglify
} from './gulp/task.uglify';
import {
  Wiredep
} from './gulp/task.wiredep';
import {
  HtmlMin
} from './gulp/task.html.min';
import {
  Useref
} from './gulp/task.useref';
import {
  Dev
} from './gulp/task.dev';
import {
  Prod
} from './gulp/task.prod';


export class GulpFile {
  constructor() {}
  private _dev        = new Dev();
  private _prod       = new Prod();
  private _inject     = new Inject();
  private _lessWatch  = new LessWatch();
  private _settings   = new Settings();
  private _uglify     = new Uglify();
  private _wiredep    = new Wiredep();
  private _htmlMin    = new HtmlMin();
  private _useref     = new Useref();
  private _lessCompileAndMinify = new LessCompileAndMinify();
}

new GulpFile();
