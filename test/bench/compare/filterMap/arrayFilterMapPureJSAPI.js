var arrayFilterMap = require('../../helpers/arrayFilterMap');
var Mutagen = require('../../../../src/mutagen');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;

var test = function () {
  return Mutagen.for.value.in.array(data)
    .filter(pred)
    .map(mapFn)
    .put.into.array();
};

var etalon = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i) {
    var x = data[i];

    if (pred(x)) {
      result.push(mapFn(x));
    }
  }

  return result;
};


module.exports = {
  name: '"Array filter map: Mutagen For vs pure js (for cycle)"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
