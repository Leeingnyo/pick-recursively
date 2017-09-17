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
  uri: 'uri', // you can use anything except an instance of Object to pick a property
      // but I recommend to use true
  nothing: true // this property will be ignored (not exist at target object)
};
pick(target1, query1);
```

The result is

```js
{
  name: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
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
  arr: [
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
  arr: { // if a type of target is array, the query object should have only one property
    element: { // you can use any name for the property
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
  arr: [
    { title: 'title 1', },
    { title: 'title 2', },
    { title: 'title 3', }
  ],
  count: 3
}
```
