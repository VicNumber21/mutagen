var _ = require('underscore');
var arrayMap = require('../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;
var test = arrayMap.test;

var etalon = function () {
  return _.map(data, mapFn);
};


module.exports = {
  name: '"Array map: Mutagen vs underscore"',
  tests: {
    'Underscore': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};