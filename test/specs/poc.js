var Mutagen = require('../../src/mutagen.js');

var Spec = {
  name: 'POC',
  tests: [{
      name: 'Map array',
      expected: [2, 4, 8],
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .map(function (x) {
                        return 2*x;
                      })
                      .toArray();
      }
    }, {
      name: 'Reduce array',
      expected: 7,
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .reduceFin(0, function (acc, x) {
                        return acc + x;
                      });
      }
    }, {
      name: 'filterMap array',
      expected: [2, 8],
      actual: function () {
        return Mutagen.for.value.fromArray([1, 2, 4])
                      .filter(function (x) {
                        return x !== 2;
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
