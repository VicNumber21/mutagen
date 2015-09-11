var Mutagen = require('../../../src/mutagen');
var expect = require('chai').expect;

var _l = require('lodash');
var _u = require('underscore');
var arrayFilterMap = require('../helpers/arrayFilterMap');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;
var etalon = arrayFilterMap.etalon;
var actual;

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
