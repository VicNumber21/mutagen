var Control = {
  End: '\uFFFF',
  Skip: '\uFFFE',

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
    var append = target && appender? appender(target): appender;
    var result = target;

    outer: for (var item = generator(); item !== Control.End; item = generator()) {
      for (var i = 0; i < mutators.length; ++i) {
        item = mutators[i](item);

        if (Control.Skip === item || Control.End === item)
          continue outer;
      }

      result = append? append(item): item;
    }

    return result;
  }
};


module.exports = Control;
