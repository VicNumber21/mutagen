var expect = require('chai').expect;

module.exports = function (spec) {
  describe(spec.name, function () {
    for (var i = 0; i < spec.tests.length; ++i) {
      var test = spec.tests[i];
      it(test.name, function () {
        expect(test.actual()).to.be.deep.equal(test.expected);
      });
    }
  });
};