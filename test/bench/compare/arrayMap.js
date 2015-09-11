var Mutagen = require('../../../src/mutagen');
var expect = require('chai').expect;

var _l = require('lodash');
var _u = require('underscore');
var arrayMap = require('../helpers/arrayMap');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;
var etalon = arrayMap.etalon;
var actual;

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
      actual = coreTest();
    },
    'Mutagen API': function () {
      actual = apiTest();
    },
    'Lodash Core': function () {
      actual = lodashCore();
    },
    'Underscore Core': function () {
      actual = underscoreCore();
    },
    'Lodash Chain': function () {
      actual = lodashChain();
    },
    'Underscore Chain': function () {
      actual = underscoreChain();
    },
    'Native': function () {
      actual = native();
    },
    'Pure JS': function () {
      actual = pureJS();
    }
  },
  onComplete: function () {
    expect(actual).to.be.deep.equal(etalon);
    console.info('               \\/\\/\\/ ----> OK');
  }
};
