var Mutagen = require('../../../src/mutagen');

var _l = require('lodash');
var _u = require('underscore');
var arrayMap = require('../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;

var coreTest = function () {
  return Mutagen.mutateArray(data, [Mutagen.Mutator.map(mapFn)]);
};

var apiTest = function () {
  return Mutagen.for.value.fromArray(data)
    .map(mapFn)
    .toArray();
};

var lodashCore = function () {
  return _l.map(data, mapFn);
};

var underscoreCore = function () {
  return _u.map(data, mapFn);
};

var lodashChain = function () {
  return _l(data).map(mapFn).value();
};

var underscoreChain = function () {
  return _u.chain(data).map(mapFn).value();
};

var native = function () {
  return data.map(mapFn);
};

var pureJS = function () {
  var result = [];
  var length = data.length;

  for (var i = 0; i < length; ++i)
    result.push(mapFn(data[i]));

  return result;
};


module.exports = {
  name: 'Array map',
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
