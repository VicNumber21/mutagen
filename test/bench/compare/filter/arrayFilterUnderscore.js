var _ = require('underscore');
var arrayFilter = require('../../helpers/arrayFilter');

var data = arrayFilter.data;
var pred = arrayFilter.pred;
var test = arrayFilter.test;

var etalon = function () {
  return _.filter(data, pred);
};


module.exports = {
  name: '"Array filter: Mutagen vs underscore"',
  tests: {
    'Underscore': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
