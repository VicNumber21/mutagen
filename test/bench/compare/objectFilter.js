var Mutagen = require('../../../src/mutagen');
var objectFilter = require('../helpers/objectFilter');
var createBench = require('../helpers/createBench');

var _l = require('lodash');
var _u = require('underscore');

var data = objectFilter.data;
var pred = objectFilter.pred;


module.exports = createBench({
  name: 'Object filter',
  etalon: objectFilter.etalon,
  tests: {
    'Mutagen Core': function () {
      return Mutagen.mutateObject(data, [Mutagen.Mutator.filter(pred)]);
    },
    'Mutagen API': function () {
      return Mutagen.for.value.and.key.fromObject(data)
        .filter(pred)
        .toObject();
    },
    'Lodash Core': function () {
      return _l.reduce(data, function (acc, x, key) {
        if (pred({key: key, value: x})) acc[key] = x;
        return acc;
      }, {});
    },
    'Underscore Core': function () {
      return _u.reduce(data, function (acc, x, key) {
        if (pred({key: key, value: x})) acc[key] = x;
        return acc;
      }, {});
    },
    'Lodash Chain': function () {
      return _l.chain(data).reduce(function (acc, x, key) {
        if (pred({key: key, value: x})) acc[key] = x;
        return acc;
      }, {}).value();
    },
    'Underscore Chain': function () {
      return _u.chain(data).reduce(function (acc, x, key) {
        if (pred({key: key, value: x})) acc[key] = x;
        return acc;
      }, {}).value();
    },
    'Pure JS': function () {
      var result = {};
      var keys = Object.keys(data);
      var length = keys.length;

      for (var i = 0; i < length; ++i) {
        var key = keys[i];
        var item = {key: key, value: data[key]};

        if (pred(item))
          result[key] = data[key];
      }

      return result;
    }
  }
});
