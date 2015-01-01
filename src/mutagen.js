var api = require('./api');
require('./generators');
require('./mutators');
require('./appenders');
require('./core');

var Mutagen = {
  for: api.generators
};

var Skip = {};
var End = {};

Mutagen.Control = {
  End: End,
  Skip: Skip,

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


//TODO new syntax test
//var result1 = Mutagen.for.item.from.array([1, 2, 3])
//                         .filter(function (x) { return x > 0; })
//                         .map(function (x) { return 2*x; })
//                     .put.into.array();
//
//var result2 = Mutagen.for.item.and.key.from.object({a:1, b:2, c:3})
//                         .filter(function (item) { return item.x > 0; })
//                         .map(function (item) { return {key: item.key, x: 2*item.x}; })
//                     .put.into.object();
//
//var result3 = Mutagen.for.item.from.object({a:1, b:2, c:3})
//                         .filter(function (x) { return x > 0; })
//                         .map(function (x) { return 2*x; })
//                     .put.into.array();
//
//var customCollection;
//var result4 = Mutagen.for.gen(function () { /* general implementation; return item; */ })
//                         .filter(function (x) { return x > 0; })
//                         .map(function (x) { return 2*x; })
//                     .put.into(function (item) { /* general appender */ });
//
//var result5 = Mutagen.for.array([1, 2, 3])
//                         .filter(function (x) { return x > 0; })
//                         .map(function (x) { return 2*x; })
//                         .reduce(0, function (acc, x) { return acc + x; })
//                         .last();// TODO should be better way to specify that reduce either produce collection or not
//
//var result6 = Mutagen.for.gen(function () { return 5; }) //infinite sequence
//                         .filter(function (x) { return x > 0; })
//                         .map(function (x) { return 2*x; })
//                         .gen(); //modified generator
