# pick-resursively

[English](README.md)

`pick-resursively`는 [Lodash](https://lodash.com/)의 [pick](https://lodash.com/docs/4.17.4#pick)처럼
`Object`에서 원하는 속성만 골라올 수 있는데, 중첩된 `Object`에서도 가능한 라이브러리입니다.
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
  uri: 'uri', // Object 타입이 아닌 걸 쓰시면 됩니다
      // 그런데 앞으로 동작이 바뀔 것 같으니 true 를 기본적으로 사용해주세요
      // boolean 이외에는 추천하지 않음
  nothing: true // 이 속성은 target1 에 없으므로 무시됩니다
};
pick(target1, query1);
```

이것의 결과는 다음과 같이 나타날 것입니다.

```js
{
  name: 'Leeingnyo',
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
  arr: { // 타겟에서의 타입이 Array면, 반드시 하나의 속성만 가져야 합니다.
    element: { // 속성은 아무 이름이나 쓰셔도 됩니다
      title: true,
    } // 속성을 여러 개 쓰면 Object.keys() 의 첫번째 원소가 들어가게 됩니다
    // 다른 라이브러리는 그냥 Array 면 알아서 들어가주는데 저도 그렇게 할까 싶음
    // 하지만 열이 맞아서 좋은 걸
  },
  count: true
};
pick(target3, query3);
```

이것의 결과는 다음과 같이 나타날 것입니다.

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
