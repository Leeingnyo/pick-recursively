# pick-resursively

[한국어](README.ko.md)

`pick-recursively` is a library that helps to pick a property from `Object` recursively.
It is written in ES6.

## Example

You can run the following examples at [test.js](test.js).

Import module.

```js
const pick = require('pick-recursively');
```

### Case 1. Basic

```js
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
pick(target1, query1);
```

The result is

```js
{
  author: 'Leeingnyo'
}
```

### Case 2. Pick Nested Properties

```js
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
  foo: true, // pick a whole foo object
  bar: {
    c: true // pick a property c in bar object
  }
};
pick(target2, query2);
```

The result is

```js
{
  foo: {
    a: 'a',
    b: 'b'
  },
  bar: { c: 'c' }
}
```

### Case 3. Pick Properties in Array

```js
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
        // but I recommend you to use a meaningful name (use a name you use in foreach statement)
      title: true,
    } // if it has properties more than one, it follows the implementation of Object.keys
  },
  count: true
};
pick(target3, query3);
```

The result is

```js
{
  articles: [
    { title: 'title 1', },
    { title: 'title 2', },
    { title: 'title 3', }
  ],
  count: 3
}
```

### Case 4. Invalid Target & Query

If the type of `target` is not object, it just return `target`.

```js
const query4 = {
  foo: true
};
pick(undefined, query4);
pick(null, query4);
pick(NaN, query4);
pick(true, query4);
pick(0, query4);
pick(1, query4);
pick('', query4);
pick('asdf', query4);
```

The result is

```js
undefined
null
NaN
true
0
1

asdf
```

### Case 5. String Query

Using query with object is verbose, I make another definition with string and array (like lodash's one).
You can understand with following examples.

```js
/*
target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
*/
pick(target1, 'author')); // pick the property 'author'
/*
{ author: 'Leeingnyo' }
*/
pick(target1, ['author', 'uri', 'nothing']); // pick the properties in the array. nothing is ignored
/*
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
*/
```

You can use this in nested query.

```js
/*
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
*/
pick(target3, {
  articles: {
    article: ['title', 'content']
  },
  count: true // to pick the property 'count', you should use 'count: true' syntax (string query is not available)
});
/*
{
  articles: [
    { title: 'title 1',
      content: 'content 1', },
    { title: 'title 2',
      content: 'content 2', },
    { title: 'title 3',
      content: 'content 3', }
  ],
  count: 3
}
*/
```

### Case 6. Filter Function

You can use a function as a value of a query.
The function sholud be unary function (should have at least one parameter)
If it returns `false`, that property will be not picked.

```js
/* target1
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
*/
pick(target1, {
  author: true,
  uri: uri => uri.indexOf('https') === 0 // pick if the protocol is https
});

// result
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively' // picked
}
```

You can do more complex one.

```js
pick({
  foo: undefined,
  bar: {
    baz: 1
  }
}, {
  foo: true,
  bar: item => {
    return item.baz > 1; // pick a property 'bar' if value of 'bar' (object) has baz that is greater than 1
  }
});

// result
{
  foo: undefined // property 'bar' is not picked
}
```

I'll show you more useful case
If the return value of a function query is valid query,
the returned query is applied to value which is the parameter of the function query.

```js
pick({
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
      if (article.isSecret) return 'isSecret'; // run query 'isSecret' for article
      return ['isSecret', 'title']; // array of string query is, too.
    }
  }
});

// result
{
  articles: [
    {
      isSecret: false,
      title: 'title 1'
    }, // pick 'isSecret', 'title'
    {
      isSecret: true // if isSecret is true
    }, // pick only 'isSecret' property
    {
      isSecret: false,
      title: 'title 3'
    }
  ]
}
```

If target is an array, the function query is used for filter.
If evaludated value is `false`, the element is dropped out from the array.

```js
/* target3
{
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
*/
pick(target3, {
  articles: {
    article: article => {
      if (article.content.indexOf('2') < 0) {
        return ['title', 'content']; // run query if satisfied
      }
      return false; // drop out articles which contains '2' in content
    }
  }
}

// result
{
  articles: [
    {
      title: 'title 1',
      content: 'content 1',
    },
    // content 2 is dropped out
    {
      title: 'title 3',
      content: 'content 3',
    }
  ]
}
```

#### Notice

target is preserved though you use function queries.

## License

[MIT License](LICENSE)
