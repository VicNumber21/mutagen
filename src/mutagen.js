var api = require('./api');
require('./core');

var Mutagen = {
  for: api.generators
};

//TODO implementation below should be in Core or Control.
var Skip = {};
var End = {};

Mutagen.Control = {
  End: End,
  Skip: Skip,

  //TODO remove iteration builder and use Runner here instead?
  iterationBuilder: function (options) {
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

Mutagen.Mutator = {
  filter: function (pred) {
    return function (item) {
      return pred(item)? item: Skip;
    };
  },

  map: function (fn) {
    return fn;
  },

  reduce: function (acc, fn) {
    return function (item) {
      return fn(acc, item);
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
          return index < arr.length? arr[index++]: End;
      };
    },
    appender: function (array) {
      return function (item) {
        array.push(item);
        return array;
      };
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
                                  : End;
      };
    },
    appender: function (obj) {
      return function (item) {
        obj[item.key] = item.value;
        return obj;
      };
    }
  }
};

Mutagen.mutateArray = Mutagen.Control.iterationBuilder(Mutagen.Options.array);
Mutagen.mutateObject = Mutagen.Control.iterationBuilder(Mutagen.Options.object);


module.exports = Mutagen;
