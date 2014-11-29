var _ = require('lodash');
var arrayFilterMap = require('../../helpers/arrayFilterMap');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;
var test = arrayFilterMap.test;

var etalon = function () {
  return _.map(_.filter(data, pred), mapFn);
};


module.exports = {
  name: '"Array filter map: Mutagen vs lodash"',
  tests: {
    'Lodash': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
