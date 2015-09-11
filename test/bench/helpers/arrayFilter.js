var data = [];
for (var i = 0; i < 100; ++i)
  data.push(i);

var pred = function (x) {
  return x % 3 === 0;
};

var etalon = [];
for (var i = 0; i < 100; i += 3)
  etalon.push(i);

module.exports = {
  data: data,
  pred: pred,
  etalon: etalon
};
