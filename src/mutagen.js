var api = require('./api');
var Control = require('./control');

var Mutagen = {
  for: api.generators
};

Mutagen.Control = Control;

  //TODO remove iteration builder and use Runner here instead?
Mutagen.Control.iterationBuilder = function (options) {
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
    for (var it = mutant(); it !== Control.End; it = mutant()) {
      if (it !== Control.Skip) ret = it;
    }

    return ret;
  };
};

Mutagen.Mutator = {
  filter: function (pred) {
    return function (item) {
      return pred(item)? item: Control.Skip;
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
          return index < arr.length? arr[index++]: Control.End;
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
                                  : Control.End;
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
