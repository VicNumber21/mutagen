var Mutagen = require('../../../src/mutagen');

var data = [];
for (var i = 0; i < 100; ++i)
  data.push(i);

var pred = function (x) {
  return x % 3 === 0;
};

module.exports = {
  data: data,
  pred: pred,
  test: function () {
    return Mutagen.mutateArray(data, [Mutagen.Mutator.filter(pred)]);
  }
};
