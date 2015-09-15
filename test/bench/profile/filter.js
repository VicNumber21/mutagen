var arrayFilter = require('../helpers/arrayFilter');
var Mutagen = require('../../../src/mutagen');
var createBench = require('../helpers/createBench');

var data = arrayFilter.data;
var pred = arrayFilter.pred;


module.exports = createBench({
  name: '"Mutagen filter"',
  etalon: arrayFilter.etalon,
  tests: {
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i) {
        var item = data[i];

        if (pred(item))
          result.push(item);
      }

      return result;
    },
    'Filter': function () {
      var result = [];
      var length = data.length;
      var filter = Mutagen.Mutator.filter(pred);

      for (var i = 0; i < length; ++i){
        var tmp = filter(data[i]);

        if (tmp === data[i]){
          result.push(filter(data[i]));
        }
      }

      return result;
    }
  }
});
