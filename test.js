const assert = require('assert');

const pick = require('.');

// case 1
// pick property
const target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
const query1 = {
  author: true, // pick a property author
  uri: 0, // you should use true to pick a property (others are ignored)
  nothing: true // this property will be ignored (not exist at target object)
};
assert.deepEqual(pick(target1, query1), {
  author: 'Leeingnyo'
});

// case 2
// pick nested property
const target2 = {
  foo: {
    a: 'a',
    b: 'b'
  },
  bar: {
    c: 'c',
    d: 'd',
  },
  baz: 'baz'
};
const query2 = {
  foo: true, // pick a whole object
  bar: {
    c: true // pick a property c in bar object
  }
};
assert.deepEqual(pick(target2, query2), {
  foo: {
    a: 'a',
    b: 'b'
  },
  bar: { c: 'c' }
});

// case 3
// pick property in array
const target3 = {
  articles: [
    {
      title: 'title 1',
      content: 'content 1',
      date: new Date()
    },
    {
      title: 'title 2',
      content: 'content 2',
      date: new Date()
    },
    {
      title: 'title 3',
      content: 'content 3',
      date: new Date()
    }
  ],
  count: 3
};
const query3 = {
  articles: { // if a type of target is array, the query object should have only one property
    element: { // you can use any name for the property
      title: true,
    } // if it has properties more than one, it follows the implementation of Object.keys
  },
  count: true
};
assert.deepEqual(pick(target3, query3), {
  articles: [
    { title: 'title 1', },
    { title: 'title 2', },
    { title: 'title 3', } ],
  count: 3
});

// case 4
// invalid target
const query4 = {
  foo: true
};
assert.equal(pick(undefined, query4), undefined);
assert.equal(pick(null, query4), null);
assert.ok(isNaN(pick(NaN, query4)));
assert.equal(pick(true, query4), true);
assert.equal(pick(0, query4), 0);
assert.equal(pick(1, query4), 1);
assert.equal(pick('', query4), '');
assert.equal(pick('asdf', query4), 'asdf');

// case 5
// fail query
const target5 = {
  foo: {
    bar: {
      baz: 1
    }
  }
};
assert.deepEqual(pick(target5, {
  foo: {
    bar: {
      baz: {
        a: true
      }
    }
  }
}), {
  foo: {
    bar: {
      baz: 1
    }
  }
});

// case 6
// string query
assert.deepEqual(pick(target1, 'author'), { author: 'Leeingnyo' });
assert.deepEqual(pick(target1, ['author', 'uri']), {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
});
assert.deepEqual(pick(target3, {
  articles: {
    article: ['title', 'content']
  },
  count: true
}), {
  articles: [
    { title: 'title 1',
      content: 'content 1', },
    { title: 'title 2',
      content: 'content 2', },
    { title: 'title 3',
      content: 'content 3', }
  ],
  count: 3
});
