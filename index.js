const pick = function (object, query) {
  try {
    return Object.keys(query)
        .map(pickHelper(object, query))
        .reduce((c, p) => Object.assign({}, c, p), {})
  } catch (err) {
    return object;
  }
}

const pickHelper = function (object, query) {
  return key => {
    let innerObject = object[key], innerQuery = query[key];
    if (innerQuery instanceof Object) {
      if (Array.isArray(innerObject)) {
        innerObject = innerObject.map(item => pick(item, innerQuery[Object.keys(innerQuery)[0]]));
      } else {
        innerObject = pick(innerObject, innerQuery);
      }
    }
    if (innerObject === undefined) {
      return {};
    }
    return { [key]: innerObject };
  }
};

module.exports = pick;
