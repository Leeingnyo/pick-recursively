const assert = require('assert');

const pick = require('..');

{
  const message = 'string query returns that property';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    createdAt: new Date('2017-09-18')
  };
  const query = 'author';

  const expected = {
    author: 'Leeingnyo'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'empty string query returns empty string property';
  const target = {
    '': 'empty string'
  };
  const query = '';

  const expected = {
    '': 'empty string'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'not exist string query returns nothing';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    createdAt: new Date('2017-09-18')
  };
  const query = '';

  const expected = { };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'array of string returns those properties';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    createdAt: new Date('2017-09-18')
  };
  const query = ['author', 'uri'];

  const expected = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'ignore not own properties';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    createdAt: new Date('2017-09-18')
  };
  const query = ['author', 'nothing'];

  const expected = {
    author: 'Leeingnyo'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'ignore all except string';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    createdAt: new Date('2017-09-18')
  };
  const query = ['author', undefined, null, {}, [], true, false, 0, 765, function () {}];

  const expected = {
    author: 'Leeingnyo'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'expect that string query in nested object works well';
  const target = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    country: 'Kroea',
    phone: '8210-xxxx-xxxx'
  };
  const query = {
    name: ['kr', 'kanji']
  };

  const expected = {
    name: {
      kr: '이',
      kanji: '李'
    },
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'string query on object';
  const target = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    country: 'Kroea',
    phone: '8210-xxxx-xxxx'
  };
  const query = ['name', 'phone'];

  const expected = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    phone: '8210-xxxx-xxxx'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'string query with object formed query (1)';
  const target = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    country: 'Kroea',
    phone: '8210-xxxx-xxxx'
  };
  const query = {
    name: 'kr',
    phone: true
  };

  const expected = {
    name: {
      kr: '이'
    },
    phone: '8210-xxxx-xxxx'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'string query with object formed query (2)';
  const target = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    country: 'Kroea',
    phone: '8210-xxxx-xxxx'
  };
  const query = {
    name: ['kr', 'en'],
    country: true
  };

  const expected = {
    name: {
      kr: '이',
      en: 'Lee'
    },
    country: 'Kroea'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

/*
{
  const message = '';
  const target = {
  };
  const query = {
  };

  const expected = {
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}
*/
