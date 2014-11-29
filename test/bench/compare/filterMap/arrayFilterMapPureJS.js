var arrayFilterMap = require('../../helpers/arrayFilterMap');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;
var test = arrayFilterMap.test;

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
  name: '"Array filter map: Mutagen vs pure js (for cycle)"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
