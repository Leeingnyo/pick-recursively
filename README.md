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

### Case 4. Invalid Target

If the type of `target` is not object, it just return `target`.

```js
const query4 = {
  foo: true
};
console.log(pick(undefined, query4));
console.log(pick(null, query4));
console.log(pick(NaN, query4));
console.log(pick(true, query4));
console.log(pick(0, query4));
console.log(pick(1, query4));
console.log(pick('', query4));
console.log(pick('asdf', query4));
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

Using query and object is verbose, I make another definition with string and array (like lodash's one).
You can understand with following examples.

```js
/*
target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
*/
console.log(pick(target1, 'author')); // pick the property 'author'
/*
{ author: 'Leeingnyo' }
*/
console.log(pick(target1, ['author', 'uri'])); // pick the properties in the array
/*
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
*/
console.log(pick(target3, {
  articles: {
    article: ['title', 'content']
  },
  count: true // to pick the property 'count', you should use 'count: true' syntax
}));
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
```

## License

[MIT License](LICENSE)
