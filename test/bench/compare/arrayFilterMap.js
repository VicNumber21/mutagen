var Mutagen = require('../../../src/mutagen');

var _l = require('lodash');
var _u = require('underscore');
var arrayFilterMap = require('../helpers/arrayFilterMap');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;

var coreTest = function () {
  return Mutagen.mutateArray(data, [
    Mutagen.Mutator.filter(pred),
    Mutagen.Mutator.map(mapFn)
  ]);
};

var apiTest = function () {
  return Mutagen.for.value.fromArray(data)
    .filter(pred)
    .map(mapFn)
    .toArray();
};

var lodashCore = function () {
  return _l.map(_l.filter(data, pred), mapFn);
};

var underscoreCore = function () {
  return _u.map(_u.filter(data, pred), mapFn);
};

var lodashChain = function () {
  return _l(data).filter(pred).map(mapFn).value();
};

var underscoreChain = function () {
  return _u.chain(data).filter(pred).map(mapFn).value();
};

var native = function () {
  return data.filter(pred).map(mapFn);
};

var pureJS = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i) {
    var x = data[i];

    if (pred(x)) {
      result.push(mapFn(x));
    }
  }

  return result;
};


module.exports = {
  name: 'Array filter map',
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
