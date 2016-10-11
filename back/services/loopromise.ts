declare let Promise;
export class LooPromise {
  constructor() {
  }

  init(condition, action) : Promise<any> {
		let resolver = Promise.defer();
    let loop = _ => {
      if (!condition()) {
        return resolver.resolve();
      }

      return action()
        .then(loop)
        .catch(resolver.reject);
    };

    process.nextTick(loop);

    return resolver.promise;
  }
}
