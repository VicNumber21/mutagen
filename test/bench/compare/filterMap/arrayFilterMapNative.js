var arrayFilterMap = require('../../helpers/arrayFilterMap');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;
var test = arrayFilterMap.test;

var etalon = function () {
  return data.filter(pred).map(mapFn);
};


module.exports = {
  name: '"Array filter map: Mutagen vs native"',
  tests: {
    'Native': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
