var Mutagen = require('../../src/mutagen.js');

var Spec = {
  name: 'Object',
  tests: [{
      name: 'Map',
      expected: {a10: 2, b20: 4, c30: 6},
      actual: function () {
        return Mutagen.for.value.and.key.fromObject({a1: 1, b2: 2, c3: 3})
                      .map(function (x) {
                        return {key: x.key + '0', value: 2* x.value};
                      })
                      .toObject();
      }
    }, {
      name: 'ReduceFin',
      expected: 'a1:1 b2:2 c3:3 ',
      actual: function () {
        return Mutagen.for.value.and.key.fromObject({a1: 1, b2: 2, c3: 3})
                      .reduceFin('', function (acc, x) {
                        return acc + x.key + ':' + x.value + ' ';
                      });
      }
    }, {
      name: 'ReduceMut',
      expected: [1, 3, 6],
      actual: function () {
        return Mutagen.for.value.and.key.fromObject({a1: 1, b2: 2, c3: 3})
          .reduceMut(0, function (acc, x) {
            return acc + x.value;
          })
          .toArray();
      }
    }, {
      name: 'FilterMap',
      expected: {'2': 'a1', '6': 'c3'},
      actual: function () {
        return Mutagen.for.value.and.key.fromObject({a1: 1, b2: 2, c3: 3})
                      .filter(function (x) {
                        return x.key !== 'b2';
                      })
                      .map(function (x) {
                        return {key: 2* x.value, value: x.key};
                      })
                      .toObject();
      }
    }
  ]
};

module.exports = Spec;
