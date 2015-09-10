var Runner = require('./runner');

var api = {
  generators: {},

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

    last[name] = function () {
      return new Runner(gen.apply(null, arguments));
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

    Runner.addMutator(name, mutator, options || {});
  },

  addAppender: function (name, appender, options) {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('Name must be specified');
    if (typeof appender !== 'function')
      throw new Error('Appender must be specified');
    if (typeof options !== 'undefined' && typeof options !== 'object')
      throw new Error('Options must be object or undefined');

    options = options || {};

    Runner.addAppender(name, appender, options || {});
  }
};

require('./generators')(api);
require('./mutators')(api);
require('./appenders')(api);

module.exports = api;
