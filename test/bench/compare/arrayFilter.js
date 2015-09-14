var Mutagen = require('../../../src/mutagen');
var arrayFilter = require('../helpers/arrayFilter');
var createTest = require('../helpers/compareFactory');

var _l = require('lodash');
var _u = require('underscore');

var data = arrayFilter.data;
var pred = arrayFilter.pred;


module.exports = createTest({
  name: 'Array filter',
  etalon: arrayFilter.etalon,
  tests: {
    'Mutagen Core': function () {
      return Mutagen.mutateArray(data, [Mutagen.Mutator.filter(pred)]);
    },
    'Mutagen API': function () {
      return Mutagen.for.value.fromArray(data)
        .filter(pred)
        .toArray();
    },
    'Lodash Core': function () {
      return _l.filter(data, pred);
    },
    'Underscore Core': function () {
      return _u.filter(data, pred);
    },
    'Lodash Chain': function () {
      return _l(data).filter(pred).value();
    },
    'Underscore Chain': function () {
      return _u.chain(data).filter(pred).value();
    },
    'Native': function () {
      return data.filter(pred);
    },
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i) {
        var item = data[i];

        if (pred(item))
          result.push(item);
      }

      return result;
    }
  }
});
