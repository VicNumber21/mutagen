var api = require('./api');
var Core = require('./core');

api.addMutator('filter',  function (pred) {
  return function (item) {
    return pred(item) ? item : Core.Skip;
  };
});

api.addMutator('map',function (fn) {
  return fn;
});

var reduce = function (acc, fn) {
  return function (item) {
    return fn(acc, item);
  };
};

api.addMutator('reduceMut', reduce, {final: false});
api.addMutator('reduceFin', reduce, {final: true});
