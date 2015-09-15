var Mutagen = require('../../../src/mutagen');
var arrayMap = require('../helpers/arrayMap');
var createBench = require('../helpers/createBench');

var _l = require('lodash');
var _u = require('underscore');

var data = arrayMap.data;
var mapFn = arrayMap.mapFn;


module.exports = createBench({
  name: 'Array map',
  etalon: arrayMap.etalon,
  tests: {
    'Mutagen Core': function () {
      return Mutagen.mutateArray(data, [Mutagen.Mutator.map(mapFn)]);
    },
    'Mutagen API': function () {
      return Mutagen.for.value.fromArray(data)
        .map(mapFn)
        .toArray();
    },
    'Lodash Core': function () {
      return _l.map(data, mapFn);
    },
    'Underscore Core': function () {
      return _u.map(data, mapFn);
    },
    'Lodash Chain': function () {
      return _l(data).map(mapFn).value();
    },
    'Underscore Chain': function () {
      return _u.chain(data).map(mapFn).value();
    },
    'Native': function () {
      return data.map(mapFn);
    },
    'Pure JS': function () {
      var result = [];
      var length = data.length;

      for (var i = 0; i < length; ++i)
        result.push(mapFn(data[i]));

      return result;
    }
  }
});
