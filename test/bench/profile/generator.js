var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');
var createBench = require('../helpers/createBench');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;


module.exports = createBench({
  name: '"Mutagen array generator"',
  etalon: arrayMap.etalon,
  tests: {
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i)
        result.push(mapFn(data[i]));

      return result;
    },
    'Array generator': function () {
      var result = [];
      var gen = Mutagen.Options.array.generator(data);
      var end = Mutagen.Control.End;

      for (var item = gen(); item !== end; item = gen())
        result.push(mapFn(item));

      return result;
    }
  }
});
