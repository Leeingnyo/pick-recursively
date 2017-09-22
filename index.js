'use strict';

const clone = require('clone-deep');

module.exports = function pick(target, query) {
  if (typeof query === 'function') {
    let evaluated = query(clone(target));
    return evaluated ? pick(target, evaluated) : {};
  } else if (typeof target !== 'object' || target === null) {
    return target;
  } else if (Array.isArray(target)) {
    let innerQuery = Object.values(query)[0];
    return target.filter(item =>
      typeof innerQuery === 'function' ? innerQuery(item) !== false : true
    ).map(item => pick(item, innerQuery));
  } else if (typeof query === 'string') {
    return target.hasOwnProperty(query) ? { [query]: target[query] } : {};
  } else if (Array.isArray(query)) {
    return query.filter(q => typeof q === 'string')
        .filter(q => target.hasOwnProperty(q))
        .reduce((result, key) => Object.assign(result, { [key]: target[key] }), {});
  } else if (typeof query === 'object' && query !== null) {
    return Object.keys(query).filter(q => target.hasOwnProperty(q))
        .reduce((result, key) => {
          let innerTarget = target[key], innerQuery = query[key];
          let picked = {};
          if (innerQuery === true || typeof innerQuery === 'object' && innerQuery !== null ||
              typeof innerQuery === 'string') {
            picked = { [key]: pick(innerTarget, innerQuery) };
          } else if (typeof innerQuery === 'function') {
            let evaluated = innerQuery(clone(innerTarget));
            if (evaluated !== false) {
              picked = { [key]: pick(innerTarget, evaluated) };
            }
          }
          return Object.assign(result, picked);
        }, {});
  }
  return target;
};
