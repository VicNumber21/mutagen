var Skip = {};
var End = {};

Core = {
  End: End,
  Skip: Skip,

  iterationBuilder: function (options) {
    //TODO ^^^ do I need it?
    var empty = options.empty;
    var generator = options.generator;
    var appender = options.appender;

    return function (source, mutators, target) {
      mutators = mutators || [];
      target = target || empty();

      var gen = generator(source);
      var mutator = Mutagen.Control.compose([].concat(mutators, [appender(target)]));
      var mutant = Mutagen.Control.mutate(gen, mutator);

      var ret = target;
      for (var it = mutant(); it !== End; it = mutant()) {
        ret = it;
      }

      return ret;
    };
  },

  compose: function (mutators) {
    return function (item) {
      for (var i = 0; i < mutators.length; ++i) {
        if (Skip === item || End === item)
          break;

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
