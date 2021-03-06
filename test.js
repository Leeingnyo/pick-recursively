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
  foo: { a: 'a', b: 'b' },
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
    article: { // you can use any name for the property
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
assert.deepEqual(pick({
  arr: [ undefined, undefined, null ]
}, {
  arr: { ele: true }
}), {
  arr: [ undefined, undefined, null ]
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
assert.deepEqual(pick(target5, {
  foo: {
    bar: false
  }
}), {
  foo: { }
});

// case 6
// string query
assert.deepEqual(pick(target1, 'author'), { author: 'Leeingnyo' });
assert.deepEqual(pick(target1, ['author', 'uri']), {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
});
assert.deepEqual(pick(target2, {
  foo: ['a', 'b']
}), {
  foo: {
    a: 'a',
    b: 'b'
  },
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
assert.deepEqual(pick(target1, ['author', 'uri', 'nothing']), {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
});

// case 7
// filter pick
assert.deepEqual(pick(target1, {
  author: true,
  uri: uri => uri.indexOf('https') === 0 // pick a property 'uri' if uri value starts with https
}), {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively' // picked
});
assert.deepEqual(pick({
  foo: undefined,
  bar: {
    baz: 1
  }
}, {
  foo: true,
  bar: item => {
    return item.baz > 1; // pick a property 'bar' if value of 'bar' (object) has baz that is greater than 1
  }
}), {
  foo: undefined // property 'bar' is not picked
});
assert.deepEqual(pick({
  articles: [
    {
      isSecret: false,
      title: 'title 1',
      content: 'content 1'
    },
    {
      isSecret: true,
      title: 'title 2',
      content: 'content 2'
    },
    {
      isSecret: false,
      title: 'title 3',
      content: 'content 3'
    }
  ]
}, {
  articles: {
    article: article => {
      if (article.isSecret) return 'isSecret'; // return another query to current item (in this case, an article object)
      return ['isSecret', 'title']; // array of string query is ok, too.
    }
  }
}), {
  articles: [
    {
      isSecret: false,
      title: 'title 1'
    },
    {
      isSecret: true
    },
    {
      isSecret: false,
      title: 'title 3'
    }
  ]
});
assert.deepEqual(pick(target3, {
  articles: {
    article: article => {
      if (article.content.indexOf('2') < 0) {
        return ['title', 'content']; // return another query for article
      }
      return false; // drop out articles which contains '2' in content
    }
  }
}), {
  articles: [
    { title: 'title 1',
      content: 'content 1', },
      // content 2 is dropped out
    { title: 'title 3',
      content: 'content 3', }
  ]
});
/*
console.log(pick(target1, target => {
  target.uri = 0;
  return 'uri';
}));
console.log(target1);
*/
