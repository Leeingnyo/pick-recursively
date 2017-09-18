# pick-resursively

[English](README.md)

`pick-resursively`는 중첩된 `Object`에서도 원하는 속성을 골라올 수 있는 라이브러리입니다.
ES6 문법을 사용했습니다.

## 사용 예

아래 예제는 [test.js](test.js)에서 확인하실 수 있습니다.

모듈을 임포트해옵니다.

```js
const pick = require('pick-recursively');
```

### Case 1. 기본

```js
const target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
const query1 = {
  author: true, // author 속성을 가져옵니다
  uri: 0, // property 를 가져오려면 true를 써주셔야 합니다
  nothing: true // 이 속성은 target1 에 없으므로 무시됩니다
};
pick(target1, query1);
```

이것의 결과는 다음과 같이 나타날 것입니다.

```js
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
```

### Case 2. 중첩된 속성 가져오기

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
  foo: true, // foo 오브젝트를 전부 가져옵니다
  bar: {
    c: true // bar 오브젝트의 c 속성을 가져옵니다
  }
};
pick(target2, query2);
```

이것의 결과는 다음과 같이 나타날 것입니다.

```js
{
  foo: {
    a: 'a',
    b: 'b'
  },
  bar: { c: 'c' }
}
```

### Case 3. 배열 안의 속성 가져오기

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
  articles: { // 타겟에서의 타입이 Array면, 반드시 하나의 속성만 가져야 합니다.
    article: { // 속성은 아무 이름이나 쓰셔도 됩니다
        // 그래도 의미있는 이름을 쓰시는 것이 좋겠죠? (foreach 에 쓰시는 변수 이름처럼)
      title: true,
    } // 속성을 여러 개 쓰면 Object.keys() 의 첫번째 원소가 들어가게 됩니다
  },
  count: true
};
pick(target3, query3);
```

이것의 결과는 다음과 같이 나타날 것입니다.

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

### Case 4. 잘못된 대상

`target`의 타입은 오브젝트 일 것이라 기대되지만, 아닌 경우도 있을 것입니다.
이런 경우 그냥 그대로 내보냅니다.

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

이것의 결과는 다음과 같이 나타날 것입니다.

```js
undefined
null
NaN
true
0
1

asdf
```

### Case 5. 문자열 사용

query를 object 만으로는 너무 장황하여 string과 array를 이용하여 정의했습니다.

```js
/*
target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
*/
console.log(pick(target1, 'author')); // property author 를 가져옵니다
/*
{ author: 'Leeingnyo' }
*/
console.log(pick(target1, ['author', 'uri'])); // 배열안의 property 들을 가져옵니다
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
  count: true // count 경우는 true 로 처리해야합니다
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
