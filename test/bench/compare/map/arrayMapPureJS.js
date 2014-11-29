var arrayMap = require('../../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;
var test = arrayMap.test;

var etalon = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i)
    result.push(mapFn(data[i]));

  return result;
};


module.exports = {
  name: '"Array map: Mutagen vs pure js (for cycle)"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
