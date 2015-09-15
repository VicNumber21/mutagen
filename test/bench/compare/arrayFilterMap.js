var Mutagen = require('../../../src/mutagen');
var arrayFilterMap = require('../helpers/arrayFilterMap');
var createBench = require('../helpers/createBench');

var _l = require('lodash');
var _u = require('underscore');

var data = arrayFilterMap.data;
var mapFn = arrayFilterMap.mapFn;
var pred = arrayFilterMap.pred;


module.exports = createBench({
  name: 'Array filter map',
  etalon: arrayFilterMap.etalon,
  tests: {
    'Mutagen Core': function () {
      var MutArray = Mutagen.Options.array;
      var generator = MutArray.generator(data);
      var mutators = [Mutagen.Mutator.filter(pred), Mutagen.Mutator.map(mapFn)];
      var appender = MutArray.appender(MutArray.empty());
      return Mutagen.Control.run(generator, mutators, appender);
    },
    'Mutagen API': function () {
      return Mutagen.for.value.fromArray(data)
        .filter(pred)
        .map(mapFn)
        .toArray();
    },
    'Lodash Core': function () {
      return _l.map(_l.filter(data, pred), mapFn);
    },
    'Underscore Core': function () {
      return _u.map(_u.filter(data, pred), mapFn);
    },
    'Lodash Chain': function () {
      return _l(data).filter(pred).map(mapFn).value();
    },
    'Underscore Chain': function () {
      return _u.chain(data).filter(pred).map(mapFn).value();
    },
    'Native': function () {
      return data.filter(pred).map(mapFn);
    },
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i) {
        var x = data[i];

        if (pred(x)) {
          result.push(mapFn(x));
        }
      }

      return result;
    }
  }
});
