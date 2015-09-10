module.exports = function (api) {
  api.addAppender('toArray', function (array) {
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

  api.addAppender('toObject', function (obj) {
      return function (item) {
        obj[item.key] = item.value;
        return obj;
      };
    }, {
      empty: function () {
        return {};
      }
    }
  );
};
