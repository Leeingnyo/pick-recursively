module.exports = function pick(target, query) {
  if (typeof target !== 'object' || target === null) {
    return target;
  } else if (Array.isArray(target)) {
    return target.map(item => pick(item, query[Object.keys(query)[0]]));
  } else if (typeof query === 'string') {
    return { [query]: target[query] };
  } else if (Array.isArray(query)) {
    return query.filter(q => typeof q === 'string')
        .reduce((result, key) => Object.assign(result, { [key]: target[key] }), {});
  } else if (typeof query === 'object' && query !== null) {
    return Object.keys(query).filter(q => target.hasOwnProperty(q))
        .reduce((result, key) => Object.assign(result, (
          query[key] === true || typeof query[key] === 'object' && query[key] !== null
        ) ? { [key]: pick(target[key], query[key]) } : {}), {});
  }
  return target;
};
