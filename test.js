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
  uri: 0, // you can use anything (except an object, string) to pick a property
      // but I recommend to use true
  nothing: true // this property will be ignored (not exist at target object)
};
console.log(pick(target1, query1));
/*
{
  name: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
*/

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
console.log(pick(target2, query2));
/*
{
  foo: {
    a: 'a',
    b: 'b'
  },
  bar: { c: 'c' }
}
*/

// case 3
// pick property in array
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
console.log(pick(target3, query3));
/*
{
  arr: [
    { title: 'title 1', },
    { title: 'title 2', },
    { title: 'title 3', } ],
  count: 3
}
*/

// case 4
// invalid target
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
/*
undefined
null
NaN
true
0
1

asdf
*/

// case 5
// fail query
const target5 = {
  foo: {
    bar: {
      baz: 1
    }
  }
};
console.log(pick(target5, {
  foo: {
    bar: {
      baz: {
        a: true
      }
    }
  }
}));
/*
{
  foo: {
    bar: {
      baz: 1
    }
  }
}
*/

// case 6
// string query
console.log(pick(target1, 'author'));
/*
{ author: 'Leeingnyo' }
*/
console.log(pick(target1, ['author', 'uri']));
/*
{
  name: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
*/
console.log(pick(target3, {
  arr: {
    article: ['title', 'content']
  },
  count: true
}));
/*
{
  arr: [
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
