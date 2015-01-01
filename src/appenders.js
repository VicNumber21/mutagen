var api = require('./api');

api.addAppender('array', function (array) {
    return function (item) {
      array.push(item);
      return array;
    };
  }, {
    empty: function () {
      return [];
    }
  }
);

api.addAppender('object', function (obj) {
    return function (item) {
      obj[item.key] = item.value;
      return obj;
    };
  },
  {
    empty: function () {
      return {};
    }
  }
);
