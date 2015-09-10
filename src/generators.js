var Core = require('./core');

module.exports = function (api) {
  api.addGenerator('fromArray', 'value', function (arr) {
    var index = 0;

    return function () {
      return index < arr.length ? arr[index++] : Core.End;
    };
  });

  api.addGenerator('fromObject', 'value.and.key', function (obj) {
    var keys = Object.keys(obj);
    var index = 0;

    return function () {
      var key;
      return index < keys.length ? (key = keys[index++], {key: key, value: obj[key]}) : Core.End;
    };
  });
};
