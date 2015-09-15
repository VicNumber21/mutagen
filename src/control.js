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
  }
};


module.exports = Control;
