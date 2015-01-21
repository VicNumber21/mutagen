var data = [];
for (var i = 0; i < 100; ++i)
  data.push(i);

var pred = function (x) {
  return x % 3 === 0;
};

var mapFn = function (x) {
  return 2*x;
};

module.exports = {
  data: data,
  pred: pred,
  mapFn: mapFn
};
