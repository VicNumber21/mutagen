var Mutagen = require('../../../src/mutagen');

var _l = require('lodash');
var _u = require('underscore');
var arrayFilter = require('../helpers/arrayFilter');

var data = arrayFilter.data;
var pred = arrayFilter.pred;

var coreTest = function () {
  return Mutagen.mutateArray(data, [Mutagen.Mutator.filter(pred)]);
};

var apiTest = function () {
  return Mutagen.for.value.fromArray(data)
    .filter(pred)
    .toArray();
};

var lodashCore = function () {
  return _l.filter(data, pred);
};

var underscoreCore = function () {
  return _u.filter(data, pred);
};

var lodashChain = function () {
  return _l(data).filter(pred).value();
};

var underscoreChain = function () {
  return _u.chain(data).filter(pred).value();
};

var native = function () {
  return data.filter(pred);
};

var pureJS = function () {
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
  name: 'Array filter',
  tests: {
    'Mutagen Core': function () {
      var result = coreTest();
    },
    'Mutagen API': function () {
      var result = apiTest();
    },
    'Lodash Core': function () {
      var result = lodashCore();
    },
    'Underscore Core': function () {
      var result = underscoreCore();
    },
    'Lodash Chain': function () {
      var result = lodashChain();
    },
    'Underscore Chain': function () {
      var result = underscoreChain();
    },
    'Native': function () {
      var result = native();
    },
    'Pure JS': function () {
      var result = pureJS();
    }
  }
};
