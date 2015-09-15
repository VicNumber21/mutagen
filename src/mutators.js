var Control = require('./control');

module.exports = function (api) {
  api.addMutator('filter', function (pred) {
    return function (item) {
      return pred(item) ? item : Control.Skip;
    };
  });

  api.addMutator('map', function (fn) {
    return fn;
  });

  var reduce = function (acc, fn) {
    return function (item) {
      acc = fn(acc, item);
      return acc;
    };
  };

  api.addMutator('reduceMut', reduce, {final: false});
  api.addMutator('reduceFin', reduce, {final: true});
};
