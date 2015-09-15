var Core = {
  End: {},
  Skip: {},

    //TODO rename Core to Control
  compose: function (mutators) {
    return function (item) {
      for (var i = 0; i < mutators.length; ++i) {
        if (Core.Skip === item || Core.End === item) break;

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
