const isObject = require('isobject');

module.exports = function objectql(obj, query) {
  if (!obj || !query) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => objectql(item, query));
  }

  const newObject = {};

  Object.keys(query).forEach((key) => {
    if (query[key] === true) {
      newObject[key] = obj[key];
    } else if (isObject(query[key])) {
      newObject[key] = objectql(obj[key], query[key]);
    }
    // ignore everything else
  });

  return newObject;
};
