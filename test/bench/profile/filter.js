var arrayFilter = require('../helpers/arrayFilter');
var Mutagen = require('../../../src/mutagen');

var data = arrayFilter.data;
var pred = arrayFilter.pred;

var test = function () {
  var result = [];
  var length = data.length;
  var filter = Mutagen.Mutator.filter(pred);

  for (var i = 0; i < length; ++i)
    result.push(filter(data[i]));

  return result;
};

var etalon = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i) {
    var item = data[i];

    if (pred(item))
      result.push(item);
  }

  return result;
};


module.exports = {
  name: '"Mutagen filter"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Filter': function () {
      var result = test();
    }
  }
};
