var Control = require('./control');

var Runner = function (gen) {
  this._gen = gen;
  this._mutators = [];
};

Runner.addMutator = function (name, mutator, options) {
  Runner.prototype[name] = function () {
      this._mutators.push(mutator.apply(null, arguments));

      return options.final? Control.run(this._gen, this._mutators): this;
    };
};

Runner.addAppender = function (name, appender, options) {
  Runner.prototype[name] = function (target) {
    return Control.run(this._gen, this._mutators, appender, target || options.empty());
  };
};

module.exports = Runner;
