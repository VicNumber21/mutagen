var _ = require('lodash');
var arrayFilter = require('../helpers/arrayFilter');

var data = arrayFilter.data;
var pred = arrayFilter.pred;
var test = arrayFilter.test;

var etalon = function () {
  return data.filter(pred);
};


module.exports = {
  name: '"Array filter: Mutagen vs native"',
  tests: {
    'Native': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
