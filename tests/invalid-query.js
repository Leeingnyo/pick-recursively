const assert = require('assert');

const pick = require('..');

{
  const message = 'undefined query returns original target';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = undefined;

  const expected = Object.assign({}, target);
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'null query returns original target';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = null;

  const expected = Object.assign({}, target);
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'true query returns original target';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = true;

  const expected = Object.assign({}, target);
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'integer query returns original target';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = 0;

  const expected = Object.assign({}, target);
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'empty object query returns empty object';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = {};

  const expected = {};
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'over picked query returns pick a fit property';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = {
    foo: {
      a: {
        overed: true
      }
    },
    bar: true
  };

  const expected = {
    foo: {
      a: 'a'
    },
    bar: true,
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

/*
{
  const message = '';
  const target = {
    foo: {
      a: 'a',
      b: 1
    },
    bar: true,
    baz: undefined
  };
  const query = ;

  const expected = ;
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}
*/
