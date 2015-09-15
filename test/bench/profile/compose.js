var arrayMap = require('../helpers/arrayMap');
var Mutagen = require('../../../src/mutagen');
var createBench = require('../helpers/createBench');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;


module.exports = createBench({
  name: '"Mutagen compose"',
  etalon: arrayMap.etalon,
  tests: {
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i)
        result.push(mapFn(data[i]));

      return result;
    },
    'Compose': function () {
      var result = [];
      var length = data.length;
      var composedMap = Mutagen.Control.compose([mapFn]);

      for (var i = 0; i < length; ++i)
        result.push(composedMap(data[i]));

      return result;
    }
  }
});
