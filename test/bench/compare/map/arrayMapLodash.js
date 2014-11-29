var _ = require('lodash');
var arrayMap = require('../../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;
var test = arrayMap.test;

var etalon = function () {
  return _.map(data, mapFn);
};


module.exports = {
  name: '"Array map: Mutagen vs lodash"',
  tests: {
    'Lodash': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
