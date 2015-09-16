var data = {};
for (var i = 0; i < 100; ++i)
  data['k' + i] = i;

var pred = function (x, key) {
  return x< 15 && key !== 'k12';
};

var predMut = function (x) {
  return x.value < 15 && x.key !== 'k12';
};

var etalon = {};
for (var i = 0; i < 15; ++i)
  if (i !== 12)
    etalon['k' + i] = i;

module.exports = {
  data: data,
  pred: pred,
  predMut: predMut,
  etalon: etalon
};
