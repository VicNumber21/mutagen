var runner = require('./runners/mocha');

var specs = [
  require('./specs/poc')
];

for (var i = 0; i < specs.length; ++i) {
  runner(specs[i]);
}
