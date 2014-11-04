var Mutagen = require('../../src/mutagen.js');

var Spec = {
  name: 'POC',
  tests: [{
      name: 'Map array',
      expected: [2, 4, 8],
      actual: function () {
        return Mutagen.mutateArray([1, 2, 4], [
          Mutagen.Mutator.map(function (x) {
            return 2*x;
          })
        ]);
      }
    }, {
      name: 'Reduce array',
      expected: [1, 3, 7], //TODO it is weird to have array; most of people want value 7 here
      actual: function () {
        return Mutagen.mutateArray([1, 2, 4], [
          Mutagen.Mutator.reduce(0, function (acc, x) {
            return acc + x;
          })
        ]);
      }
    }, {
      name: 'filterMap array',
      expected: [2, 8], //TODO it is weird to have array; most of people want value 7 here
      actual: function () {
        return Mutagen.mutateArray([1, 2, 4], [
          Mutagen.Mutator.filter(function (x) {
            return x !== 2;
          }),
          Mutagen.Mutator.map(function (x) {
            return 2*x;
          })
        ]);
      }
    }
  ]
};

module.exports = Spec;