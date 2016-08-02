function pick(object, keys) {
  const possibleKeys = Object.keys(object);

  return keys
    .filter(function(key) {
      return !!~possibleKeys.indexOf(key);
    })
    .reduce(function(newObject, key) {
      newObject[key] = object[key];
      return newObject;
    }, {});
}

module.exports = function trimObject(data, trimmer) {
  if(!data || !trimmer) {
    return data;
  }

  if(!Array.isArray(trimmer.$whiteList)) {
    throw new Error('trimmer.$whiteList should be an array of strings');
  }

  var newObject = {};

  if(trimmer.$whiteList) {
    newObject = pick(data, trimmer.$whiteList);
  }

  const childTrimmers = Object.keys(trimmer).filter(function(key) {
    return key !== '$whiteList' && !!newObject[key];
  });

  childTrimmers.forEach(function(key) {
    if(Array.isArray(newObject[key])) {
      newObject[key] = newObject[key].map(function(arrayItem) {
        return trimObject(arrayItem, trimmer[key]);
      });
    } else {
      newObject[key] = trimObject(newObject[key], trimmer[key]);
    }
  });

  return newObject;
};
