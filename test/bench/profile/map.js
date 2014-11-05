var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;

var test = function () {
  var result = [];
  var length = data.length;
  var mapper = Mutagen.Mutator.map(mapFn);

  for (var i = 0; i < length; ++i)
    result.push(mapper(data[i]));

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
  name: '"Mutagen map"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Map': function () {
      var result = test();
    }
  }
};