'use strict';
module.exports = function pick(target, query) {
  if (typeof query === 'function') {
    return query(target) ? pick(target, query(target)) : {};
  } else if (typeof target !== 'object' || target === null) {
    return target;
  } else if (Array.isArray(target)) {
    return target.filter(item =>
      typeof query[Object.keys(query)[0]] === 'function' ? query[Object.keys(query)[0]](item) : true
    ).map(item => pick(item, query[Object.keys(query)[0]]));
  } else if (typeof query === 'string') {
    return target.hasOwnProperty(query) ? { [query]: target[query] } : {};
  } else if (Array.isArray(query)) {
    return query.filter(q => typeof q === 'string')
        .filter(q => target.hasOwnProperty(q))
        .reduce((result, key) => Object.assign(result, { [key]: target[key] }), {});
  } else if (typeof query === 'object' && query !== null) {
    return Object.keys(query).filter(q => target.hasOwnProperty(q))
        .reduce((result, key) => Object.assign(result,
          query[key] === true || typeof query[key] === 'object' && query[key] !== null ||
              typeof query[key] === 'string'
            ? { [key]: pick(target[key], query[key]) }
            : typeof query[key] === 'function' && query[key](target[key])
              ? { [key]: pick(target[key], query[key](target[key])) } : {}
        ), {});
  }
  return target;
};
