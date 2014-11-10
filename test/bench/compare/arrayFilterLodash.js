var _ = require('lodash');
var arrayFilter = require('../helpers/arrayFilter');

var data = arrayFilter.data;
var pred = arrayFilter.pred;
var test = arrayFilter.test;

var etalon = function () {
  return _.filter(data, pred);
};


module.exports = {
  name: '"Array filter: Mutagen vs lodash"',
  tests: {
    'Lodash': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
