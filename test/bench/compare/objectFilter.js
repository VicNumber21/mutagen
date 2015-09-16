var Mutagen = require('../../../src/mutagen');
var objectFilter = require('../helpers/objectFilter');
var createBench = require('../helpers/createBench');

var _l = require('lodash');
var _u = require('underscore');
var Lazy = require('lazy.js');

var data = objectFilter.data;
var pred = objectFilter.pred;
var predMut = objectFilter.predMut;


module.exports = createBench({
  name: 'Object filter',
  etalon: objectFilter.etalon,
  tests: {
    'Mutagen Core': function () {
      var MutObject = Mutagen.Options.object;
      var generator = MutObject.generator(data);
      var mutators = [Mutagen.Mutator.filter(predMut)];
      var appender = MutObject.appender(MutObject.empty());
      return Mutagen.Control.run(generator, mutators, appender);
    },
    'Mutagen API': function () {
      return Mutagen.for.value.and.key.fromObject(data)
        .filter(predMut)
        .toObject();
    },
    'Lodash Core': function () {
      return _l.reduce(data, function (acc, x, key) {
        if (pred(x, key)) acc[key] = x;
        return acc;
      }, {});
    },
    'Underscore Core': function () {
      return _u.reduce(data, function (acc, x, key) {
        if (pred(x, key)) acc[key] = x;
        return acc;
      }, {});
    },
    'Lazy': function () {
      return Lazy(data).filter(pred).toObject();
    },
    'Lodash Chain': function () {
      return _l.chain(data).reduce(function (acc, x, key) {
        if (pred(x, key)) acc[key] = x;
        return acc;
      }, {}).value();
    },
    'Underscore Chain': function () {
      return _u.chain(data).reduce(function (acc, x, key) {
        if (pred(x, key)) acc[key] = x;
        return acc;
      }, {}).value();
    },
    'Pure JS': function () {
      var result = {};
      var keys = Object.keys(data);
      var length = keys.length;

      for (var i = 0; i < length; ++i) {
        var key = keys[i];
        var x = data[key];

        if (pred(x, key))
          result[key] = x;
      }

      return result;
    }
  }
});
