const isObject = require('isobject');

module.exports = function objectql(source, query) {
  if ((!Array.isArray(source) && !isObject(source)) || !isObject(query)) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map((item) => objectql(item, query));
  }

  const sourceKeys = Object.keys(source);

  return Object.keys(query)
    .filter((key) => !!~sourceKeys.indexOf(key))
    .reduce((newSource, key) => {
      if (query[key] === true) {
        return Object.assign({}, newSource, {
          [key]: source[key]
        });
      }

      if (isObject(query[key])) {
        return Object.assign({}, newSource, {
          [key]: objectql(source[key], query[key])
        });
      }

      return newSource;
    }, {});
};
