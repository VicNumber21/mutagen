var arrayMap = require('../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;
var test = arrayMap.test;

var etalon = function () {
  return data.map(mapFn);
};


module.exports = {
  name: '"Array map: Mutagen vs native"',
  tests: {
    'Native': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};