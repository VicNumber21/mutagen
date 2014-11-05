var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;

var test = function () {
  var result = [];
  var length = data.length;
  var appender = Mutagen.Options.array.appender(result);

  for (var i = 0; i < length; ++i)
    appender(mapFn(data[i]));

  return result;
};

var etalon = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i)
    result.push(mapFn(data[i]));

  return result;
};


module.exports = {
  name: '"Mutagen appender"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Appender': function () {
      var result = test();
    }
  }
};