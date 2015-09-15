var Mutagen = require('../../src/mutagen.js');

var Spec = {
  name: 'Array',
  tests: [{
      name: 'Map',
      expected: [2, 4, 8],
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .map(function (x) {
                        return 2*x;
                      })
                      .toArray();
      }
    }, {
      name: 'ReduceFin',
      expected: 7,
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .reduceFin(0, function (acc, x) {
                        return acc + x;
                      });
      }
    }, {
      name: 'ReduceMut',
      expected: [1, 3, 7],
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
          .reduceMut(0, function (acc, x) {
            return acc + x;
          })
          .toArray();
      }
    }, {
      name: 'FilterMap',
      expected: [2, 4],
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .filter(function (x) {
                        return x !== 4;
                      })
                      .map(function (x) {
                        return 2*x;
                      })
                      .toArray();
      }
    }
  ]
};

module.exports = Spec;
