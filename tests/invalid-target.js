const assert = require('assert');

const pick = require('..');

{
  const message = 'target undefined';
  const target = undefined;
  const query = {
    foo: true
  };

  const expected = undefined;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target NaN';
  const target = NaN;
  const query = {
    foo: true
  };

  const expected = NaN;
  const actual = pick(target, query);

  assert.ok(isNaN(expected), message);
}

{
  const message = 'target null';
  const target = null;
  const query = {
    foo: true
  };

  const expected = null;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target true';
  const target = true;
  const query = {
    foo: true
  };

  const expected = true;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target false';
  const target = false;
  const query = {
    foo: true
  };

  const expected = false;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target 0';
  const target = 0;
  const query = {
    foo: true
  };

  const expected = 0;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target 765';
  const target = 765;
  const query = {
    foo: true
  };

  const expected = 765;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target empty string';
  const target = '';
  const query = {
    foo: true
  };

  const expected = '';
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target string';
  const target = 'pro';
  const query = {
    foo: true
  };

  const expected = 'pro';
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

{
  const message = 'target function';
  const f = function () {};
  const target = f;
  const query = {
    foo: true
  };

  const expected = f;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}

/*
{
  const message = '';
  const target = ;
  const query = {
    foo: true
  };

  const expected = ;
  const actual = pick(target, query);

  assert.equal(actual, expected, message);
}
*/
