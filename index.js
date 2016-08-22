const isObject = require('isobject');

module.exports = function objectql(source, query) {
  if ((!Array.isArray(source) && !isObject(source)) || !isObject(query)) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map((item) => objectql(item, query));
  }

  const newObject = {};
  const sourceKeys = Object.keys(source);

  Object.keys(query)
    .filter((key) => !!~sourceKeys.indexOf(key))
    .forEach((key) => {
      if (query[key] === true) {
        newObject[key] = source[key];
      } else if (isObject(query[key])) {
        newObject[key] = objectql(source[key], query[key]);
      }
      // ignore everything else
    });

  return newObject;
};
