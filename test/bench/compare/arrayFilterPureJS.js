var _ = require('underscore');
var arrayFilter = require('../helpers/arrayFilter');

var data = arrayFilter.data;
var pred = arrayFilter.pred;
var test = arrayFilter.test;

var etalon = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i) {
    var item = data[i];

    if (pred(item))
      result.push(item);
  }

  return result;
};


module.exports = {
  name: '"Array filter: Mutagen vs pure js"',
  tests: {
    'Pure JS': function () {
      var result = etalon();
    },
    'Mutagen': function () {
      var result = test();
    }
  }
};
