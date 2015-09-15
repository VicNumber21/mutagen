var Core = require('./core');

var Runner = function (gen) {
  this._gen = gen;
  this._mutators = [];
};

Runner.prototype.run =  function (appender, target) {
  if (typeof appender !== 'undefined') {
    var targetUnknown = (typeof target === 'undefined');
    this._mutators.push(targetUnknown? appender: appender(target));
  }

  var mutator = Core.compose(this._mutators);
  var mutant = Core.mutate(this._gen, mutator);

  var result = target;
  for (var it = mutant(); it !== Core.End; it = mutant()) {
    if (it !== Core.Skip) result = it;
  }

  return result;
};

Runner.addMutator = function (name, mutator, options) {
  Runner.prototype[name] = function () {
      this._mutators.push(mutator.apply(null, arguments));

      return options.final? this.run(): this;
    };
};

Runner.addAppender = function (name, appender, options) {
  Runner.prototype[name] = function (target) {
    return this.run(appender, target || options.empty());
  };
};

module.exports = Runner;
