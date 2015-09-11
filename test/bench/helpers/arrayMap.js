var Mutagen = require('../../../src/mutagen');

var data = [];
for (var i = 0; i < 100; ++i)
  data.push(i);

var mapFn = function (x) {
  return 2*x;
};

var etalon = [];
for (var i = 0; i < 100; ++i)
  etalon.push(2*i);

module.exports = {
  data: data,
  mapFn: mapFn,
  etalon: etalon
};
