var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');
var createBench = require('../helpers/createBench');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;


module.exports = createBench({
  name: '"Mutagen map"',
  etalon: arrayMap.etalon,
  tests: {
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i)
        result.push(mapFn(data[i]));

      return result;
    },
    'Map': function () {
      var result = [];
      var length = data.length;
      var mapper = Mutagen.Mutator.map(mapFn);

      for (var i = 0; i < length; ++i)
        result.push(mapper(data[i]));

      return result;
    }
  }
});
