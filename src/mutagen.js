var Mutagen = {};

Mutagen.Control = {
  End: {},
  Skip: {},

  is: function (item) {
    return item === Mutagen.Control.End || item === Mutagen.Control.Skip;
  },

  filter: function (item, fn) {
    return Mutagen.Control.is(item)? item: fn(item);
  },

  iterationBuilder: function (options) {
    var empty = options.empty;
    var generator = options.generator;
    var appender = options.appender;
    var baseMutators = options.mutators || [];

    return function (source, mutators, target) {
      mutators = mutators || [];
      target = target || empty();

      var gen = generator(source);
      var mutator = Mutagen.Control.compose(baseMutators.concat(mutators, [appender(target)]));
      var mutant = Mutagen.Control.mutate(gen, mutator);

      var ret = target;
      for (var it = mutant(); it !== Mutagen.Control.End; it = mutant()) {
        ret = it;
      }

      return ret;
    };
  },

  compose: function (mutators) {
    return function (item) {
      //TODO rewrite it using Mutagen structures instead of for??
      for (var i = 0; !Mutagen.Control.is(item) && i < mutators.length; ++i) {
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

Mutagen.Mutator = {
  filter: function (pred) {
    return Mutagen.Mutator.map(function (item) {
      return pred(item)? item: Mutagen.Control.Skip;
    });
  },

  map: function (fn) {
    return function (item) {
      return Mutagen.Control.filter(item, fn);
    };
  },

  reduce: function (acc, fn) {
    return function (item) {
      if (!Mutagen.Control.is(item)) {
        acc = fn(acc, item);
      }

      return acc;
    };
  }
};

Mutagen.Options = {
  array: {
    empty: function () {
      return [];
    },
    generator: function (arr) {
      var index = 0;

      return function () {
          return index < arr.length? arr[index++]: Mutagen.Control.End;
      };
    },
    appender: function (array) {
      return Mutagen.Mutator.reduce(array, function (acc, item) {
        acc.push(item);
        return acc;
      });
    }
  },

  object: {
    empty: function () {
      return {};
    },
    generator: function (obj) {
      var keys = Object.keys(obj);
      var index = 0;

      return function () {
        var key;
        return index < keys.length? (key = keys[index++], {key: key, value: obj[key]})
                                  : Mutagen.Control.End;
      };
    },
    appender: function (obj) {
      return Mutagen.Mutator.reduce(obj, function (acc, item) {
        acc[item.key] = item.value;
        return acc;
      });
    }
  }
};

Mutagen.mutateArray = Mutagen.Control.iterationBuilder(Mutagen.Options.array);
Mutagen.mutateObject = Mutagen.Control.iterationBuilder(Mutagen.Options.object);


module.exports = Mutagen;