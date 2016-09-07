(function() {
  'use strict';

  module.exports = (condition, action) => {
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
  };
}());
