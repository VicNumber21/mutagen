var runner = require('./runners/mocha');

var specs = [
  require('./specs/array'),
];

for (var i = 0; i < specs.length; ++i) {
  runner(specs[i]);
}
