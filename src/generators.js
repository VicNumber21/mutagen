var api = require('./api');
var Core = require('./core');

api.addGenerator('array', 'value', function (arr) {
  var index = 0;

  return function () {
    return index < arr.length? arr[index++]: Core.End;
  };
});

api.addGenerator('object', 'value.and.key', function (obj) {
  var keys = Object.keys(obj);
  var index = 0;

  return function () {
    var key;
    return index < keys.length? (key = keys[index++], {key: key, value: obj[key]}): Core.End;
  };
});
