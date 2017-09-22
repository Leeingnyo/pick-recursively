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
  author: 'Leeingnyo'
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
    } // 속성을 여러 개 쓰면 Object.values() 의 첫번째 원소가 들어가게 됩니다
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

### Case 4. 잘못된 대상과 질의

`target`의 타입은 오브젝트 일 것이라 기대되지만, 아닌 경우도 있을 것입니다.
이런 경우 그냥 그대로 내보냅니다.

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

### Case 5. 문자열 쿼리

query를 object 만으로는 너무 장황하여 string과 array를 이용하여 정의했습니다.

```js
/*
target1 = {
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively',
  country: 'Korea'
};
*/
pick(target1, 'author'); // property author 를 가져옵니다
/*
{ author: 'Leeingnyo' }
*/
pick(target1, ['author', 'uri', 'nothing']); // 배열안의 property 들을 가져옵니다. nothing 은 무시됩니다
/*
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively'
}
*/
```

중첩된 상황에서도 사용가능합니다.

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
  count: true // count 경우는 true 로 처리해야합니다 (string query 사용 불가)
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

### Case 7. 함수 쿼리

함수도 쿼리의 value 로 사용하실 수 있습니다.
이 함수는 하나의 인수를 가져야 하고 그 인수는 쿼리에 해당하는 target의 value입니다.
함수가 `false`를 리턴하면 그 property 는 가져오지 않습니다.

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
  uri: uri => uri.indexOf('https') === 0 // 프로토콜이 https 면 가져옴
});

// result
{
  author: 'Leeingnyo',
  uri: 'https://github.com/Leeingnyo/pick-recursively' // 가져왔습니다
}
```

더 복잡한 형태의 일도 가능합니다.

```js
pick({
  foo: undefined,
  bar: {
    baz: 1
  }
}, {
  foo: true,
  bar: item => {
    return item.baz > 1; // bar object의 baz가 1보다 크면 bar 오브젝트를 가져옵니다.
  }
});

// result
{
  foo: undefined // false 이기 때문에 안 가져오죠
}
```

좀 더 유용한 경우를 보여드리겠습니다.
리턴값으로 올바른 query가 오면 함수의 인자로 들어오는 value에 대해서 리턴된 query를 수행합니다.

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
      if (article.isSecret) return 'isSecret'; // article 에 대해서 다른 쿼리를 수행하게 합니다
      return ['isSecret', 'title']; // 문자열 배열 쿼리도 가능합니다
    }
  }
});

// result
{
  articles: [
    {
      isSecret: false,
      title: 'title 1'
    }, // content 는 빠짐
    {
      isSecret: true
    }, // isSecret 만 남음
    {
      isSecret: false,
      title: 'title 3'
    }
  ]
}
```

target 이 array인 경우에는 filter 역할을 할 수도 있습니다.
평가된 값이 `false`일 경우, 해당 element는 array에서 제외됩니다.

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
        return ['title', 'content']; // 조건을 만족시키는 article엔 다른 쿼리를
      }
      return false; // 내용에 2가 포함되어있으면 배열에서 제외시킵니다
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
    // content 2 를 내용으로 가진 object 는 빠졌습니다
    {
      title: 'title 3',
      content: 'content 3',
    }
  ]
}
```

#### Notice

function query 를 사용하셔도 target은 보존됩니다.

## License

[MIT License](LICENSE)
