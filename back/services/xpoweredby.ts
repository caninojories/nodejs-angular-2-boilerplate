
export class XpoweredBy {
  constructor() {}

  init(req, res, next) {
    res.removeHeader('X-Powered-By');
    next();
  };
}
