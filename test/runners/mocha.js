var expect = require('chai').expect;

module.exports = function (spec) {
  describe(spec.name, function () {
    for (var i = 0; i < spec.tests.length; ++i) {
      (function (test) {
        it(test.name, function () {
          var actual = test.actual();
          expect(actual).to.be.deep.equal(test.expected);
        });
      })(spec.tests[i]);
    }
  });
};
