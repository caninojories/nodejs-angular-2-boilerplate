import * as express from 'express';
import * as Const from './config/const';
import {Api} from './api';
import {ExpressConfig} from './config/express';
import {Modules} from './config/modules';

/**
 * The server.
 *
 * @class Server
 */
declare let global;
export class Server {
  private _app    : express.Application;
  private _router : express.Router;
  private _expressConfig: ExpressConfig;
  private _api: Api;
  private _modules = Modules.get();
  static bootstrap(): Server;

  /**
  * Bootstrap the application.
  *
  * @class Server
  * @method bootstrap
  * @static
  * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
  */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
  * Constructor.
  *
  * @class Server
  * @constructor
  */
  constructor() {
    //create expressjs application
    this._app            = express();
    this._router         = express.Router();
    this._expressConfig  = new ExpressConfig(this._app, this._router);
    this._api            = new Api(this._app);
    this._expressConfig.loadExpressConfig();

    /**
     * api here
     */
    this._expressConfig.loadExpressMiddleware();

  }

  getExpressInstance() {
    return this._app;
  }
}

if (!Modules.get().args.test) {new Server();}
