var Core = require('./core');

var api = {
  generators: {},
  mutators: {},

  addGenerator: function (name, path, gen) {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('Name must be specified');
    if (typeof path !== 'string' || path.length === 0)
      throw new Error('Path must be specified');
    if (typeof gen !== 'function')
      throw new Error('Generator must be specified');

    var chain = path.split('.');
    var last = api.generators;

    for (var i = 0; i < chain.length; ++i) {
      var link = chain[i];

      if (typeof last[link] !== 'object') {
        last[link] = {};
      }

      last = last[link];
    }

    last.in = {};
    last.in[name] = function () {
      //TODO how to make new instance of current for each iteration to prevent re-writing it
      api.current = {
        gen: gen.apply(null, arguments)
      };

      return api.mutators;
    };
  },

  addMutator: function (name, mutator, options) {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('Name must be specified');
    if (name === 'put')
      throw new Error('Put is reserved name');
    if (typeof mutator !== 'function')
      throw new Error('Mutator must be specified');
    if (typeof options !== 'undefined' && typeof options !== 'object')
      throw new Error('Options must be object or undefined');

    options = options || {};

    api.mutators[name] = function () {
      var mutators = api.current.mutators = api.current.mutators || [];
      mutators.push(mutator.apply(null, arguments));

      return options.final? api.run(): api.mutators;
    };
  },

  addAppender: function (name, appender, options) {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('Name must be specified');
    if (typeof appender !== 'function')
      throw new Error('Appender must be specified');
    if (typeof options !== 'undefined' && typeof options !== 'object')
      throw new Error('Options must be object or undefined');

    options = options || {};

    api.mutators.put.into[name] = function (target) {
      target = target || options.empty();

      return api.mutators.put.into(appender, target);
    };
  },

  run: function () {
    var mutator = Core.compose(api.current.mutators);
    var mutant = Core.mutate(api.current.gen, mutator);

    var ret = api.current.target;
    for (var it = mutant(); it !== Core.End; it = mutant()) {
      ret = it;
    }

    return ret;
  }
};

api.mutators.put = {
  into: function (appender, target) {
    if (typeof target !== 'undefined') {
      appender = appender(target);
    }

    api.current.target = target;

    var mutators = api.current.mutators = api.current.mutators || [];
    mutators.push(appender);

    return api.run();
  }
};


module.exports = api;
