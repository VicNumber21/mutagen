var Control = {
  End: {},
  Skip: {},

  compose: function (mutators) {
    return function (item) {
      for (var i = 0; i < mutators.length; ++i) {
        if (Control.Skip === item || Control.End === item)
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
  },

  run: function (generator, mutators, appender, target) {
    if (typeof appender !== 'undefined') {
      var targetUnknown = (typeof target === 'undefined');
      mutators.push(targetUnknown? appender: appender(target));
    }

    var mutator = Control.compose(mutators);
    var mutant = Control.mutate(generator, mutator);

    var result = target;
    for (var it = mutant(); it !== Control.End; it = mutant()) {
      if (it !== Control.Skip)
        result = it;
    }

    return result;
  }
};


module.exports = Control;
