var Core = {
  End: {},
  Skip: {},

  iterationBuilder: function (options) {
    //TODO rename Core to Control
    //TODO remove iteration builder but create another object Iterator or Runner
    //TODO the runner object should have method like setGen, setTarget and so on and run
    //TODO the runner in api but check if it does not make things to slow
    //TODO to test it make api2 first with copy/paste; then choose the fastest
    //TODO IMPORTANT do not play in the best designer game if it make things slower!!!
    var empty = options.empty;
    var generator = options.generator;
    var appender = options.appender;

    return function (source, mutators, target) {
      mutators = mutators || [];
      target = target || empty();

      var gen = generator(source);
      var mutator = Core.compose([].concat(mutators, [appender(target)]));
      var mutant = Core.mutate(gen, mutator);

      var ret = target;
      for (var it = mutant(); it !== Core.End; it = mutant()) {
        ret = it;
      }

      return ret;
    };
  },

  compose: function (mutators) {
    return function (item) {
      for (var i = 0; i < mutators.length; ++i) {
        if (Core.Skip === item || Core.End === item) {
          break;
        }

        item = mutators[i](item);
      }

      return item;
    };
  },

  mutate: function (gen, mutator) {
    return function () {
      return mutator(gen());
    };
  }
};


module.exports = Core;
