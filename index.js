const isObject = require('isobject');

function parse(query) {
  if (isObject(query)) {
    return query;
  }
  try {
    return JSON.parse(
      query
        .replace(/(?:\r\n|\r|\n)|,|:/g, ' ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/([^ {}]+) /g, '"$1" ')
        .replace(/" "/g, '":true, "')
        .replace(/} "/g, '}, "')
        .replace(/" {/g, '": {')
        .replace(/" }/g, '":true }')
    );
  } catch (error) {
    return null;
  }
}

module.exports = function objectql(source, query) {
  if (!Array.isArray(source) && !isObject(source)) {
    return source;
  }

  // eslint-disable-next-line no-param-reassign
  query = parse(query);

  if (!isObject(query)) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map(item => objectql(item, query));
  }

  const sourceKeys = Object.keys(source);

  return Object.keys(query)
    .filter(key => !!~sourceKeys.indexOf(key))
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
