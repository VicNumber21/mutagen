var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;

var test = function () {
  var result = [];
  var length = data.length;
  var composedMap = Mutagen.Control.compose([mapFn]);

  for (var i = 0; i < length; ++i)
    result.push(composedMap(data[i]));

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
  name: '"Mutagen compose"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Compose': function () {
      var result = test();
    }
  }
};