const isObject = require('isobject');

function parse(query) {
  if (typeof query !== 'string') {
    return query;
  }
  try {
    return JSON.parse(
      query
        .replace(/(?:\r\n|\r|\n)|,|:/g, ' ')
        .replace(/([{}])/g, ' $1 ')
        .replace(/ +/g, ' ')
        .trim()
        .replace(/([^ {}]+) /g, '"$1" ')
        .replace(/" "/g, '":true, "')
        .replace(/} "/g, '}, "')
        .replace(/" {/g, '": {')
        .replace(/" }/g, '":true }')
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Invalid objectql query: ${query}`);
    throw error;
  }
}

module.exports = function objectql(source, query) {
  if (!Array.isArray(source) && !isObject(source)) {
    return source;
  }

  const parsedQuery = parse(query);

  if (!isObject(parsedQuery)) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map(item => objectql(item, parsedQuery));
  }

  const sourceKeys = Object.keys(source);

  return Object.keys(parsedQuery)
    .filter(key => !!~sourceKeys.indexOf(key))
    .reduce((newSource, key) => {
      if (parsedQuery[key] === true) {
        return Object.assign({}, newSource, {
          [key]: source[key]
        });
      }

      if (isObject(parsedQuery[key])) {
        return Object.assign({}, newSource, {
          [key]: objectql(source[key], parsedQuery[key])
        });
      }

      return newSource;
    }, {});
};
