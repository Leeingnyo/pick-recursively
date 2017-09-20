const assert = require('assert');

const pick = require('..');

{
  const message = 'fail picking a property';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    country: 'Korea'
  };
  const query = {
    author: true
  };

  const expected = {
    author: 'Leeingnyo'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail picking many properties';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    country: 'Korea'
  };
  const query = {
    author: true,
    uri: true
  };

  const expected = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail to pick undefined, null, property';
  const target = {
    foo: undefined,
    bar: null,
    baz: false
  };
  const query = {
    foo: true,
    bar: true,
    baz: true
  };

  const expected = {
    foo: undefined,
    bar: null,
    baz: false
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'it picked a property which of value is not \'true\'';
  const target = {
    author: 'Leeingnyo',
    uri: 'https://github.com/Leeingnyo/pick-recursively',
    country: 'Korea'
  };
  const query = {
    author: true,
    uri: 0
  };

  const expected = {
    author: 'Leeingnyo'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'it picked a property which of value is not \'true\' (2)';
  const target = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6, 
  };
  const query = {
    0: true,
    1: false,
    2: 1,
    3: 0,
    4: undefined,
    5: NaN,
    6: null,
  };

  const expected = {
    0: 0
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail picking a nested property';
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
    name: {
      kr: true
    },
    country: true,
    phone: true
  };

  const expected = {
    name: {
      kr: '이'
    },
    country: 'Kroea',
    phone: '8210-xxxx-xxxx'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail picking whole object';
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
    name: true,
    country: true
  };

  const expected = {
    name: {
      kr: '이',
      en: 'Lee',
      kanji: '李'
    },
    country: 'Kroea'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail iterating an array';
  const target = {
    fruits: [
      {
        name: 'apple',
        price: 400,
        color: 'red'
      },
      {
        name: 'banana',
        price: 100,
        color: 'yellow'
      },
      {
        name: 'kiwi',
        price: 200,
        color: 'brown?'
      }
    ]
  };
  const query = {
    fruits: {
      fruit: {
        name: true,
        price: true
      }
    }
  };

  const expected = {
    fruits: [
      {
        name: 'apple',
        price: 400
      },
      {
        name: 'banana',
        price: 100
      },
      {
        name: 'kiwi',
        price: 200
      }
    ]
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail iterating an array (2)';
  const target = [
    'foo',
    'bar',
    'baz'
  ];
  const query = {
    ele: true
  };

  const expected = [
    'foo',
    'bar',
    'baz'
  ];
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'fail picking strange element';
  const f = function () { }
  const target = {
    strangeArray: [
      undefined,
      null,
      true,
      false,
      1,
      0,
      f
    ]
  };
  const query = {
    strangeArray: {
      ele: true
    }
  };

  const expected = {
    strangeArray: [
      undefined,
      null,
      true,
      false,
      1,
      0,
      f
    ]
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
