var _ = require('underscore');
var expect = require('chai').expect;


var createBench = function (spec) {
  var actual;

  var test = {
    name: spec.name,
    tests: _.reduce(spec.tests, function (acc, f, n) {
      acc[n] = function () {
        actual = f();
      };

      return acc;
    }, {}),
    onComplete: function () {
      expect(actual).to.be.deep.equal(spec.etalon);
      console.info('               \\/\\/\\/ ----> OK');
    }
  };

  return test;
};

module.exports = createBench;
