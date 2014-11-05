var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;

var test = function () {
  var result = [];
  var gen = Mutagen.Options.array.generator(data);
  var end = Mutagen.Control.End;

  for (var item = gen(); item !== end; item = gen())
    result.push(mapFn(item));

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
  name: '"Mutagen array generator"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Array generator': function () {
      var result = test();
    }
  }
};