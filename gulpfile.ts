import {
  Inject
} from './gulp/inject';
import {
  LessCompileAndMinify
} from './gulp/less.compile.minify';
import {
  LessWatch
} from './gulp/less.watch';
import {
  Settings
} from './gulp/settings';
import {
  Uglify
} from './gulp/uglify';
import {
  Wiredep
} from './gulp/wiredep';
import {
  HtmlMin
} from './gulp/html.min';
import {
  Useref
} from './gulp/useref';
import {
  Dev
} from './gulp/dev';
import {
  Prod
} from './gulp/prod';


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
