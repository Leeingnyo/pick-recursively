const assert = require('assert');

const pick = require('..');

{
  const message = 'basic filter function';
  const target = {
    name: 'youtube',
    uri: 'https://www.youtube.com'
  };
  const anotherTarget = {
    name: 'niconico video',
    uri: 'http://www.nicovideo.jp'
  };
  const query = {
    name: true,
    uri: uri => uri.indexOf('https://') === 0
  };

  const expected = {
    name: 'youtube',
    uri: 'https://www.youtube.com'
  };
  const anotherExpected = {
    name: 'niconico video'
  };
  const actual = pick(target, query);
  const anotherActal = pick(anotherTarget, query);

  assert.deepEqual(actual, expected, message);
  assert.deepEqual(anotherActal, anotherExpected, message);
}

{
  const message = 'handle function query';
  const target = {
    foo: 'bar'
  };
  const query = {
    foo: () => true
  };

  const expected = {
    foo: 'bar'
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'handle function that returns another query (array of string)';
  const target = {
    number: 5,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  };
  const query = target => {
    let query = [];
    switch (target.number) {
      case 6: query.push('six')
      case 5: query.push('five')
      case 4: query.push('four')
      case 3: query.push('three')
      case 2: query.push('two')
      case 1: query.push('one')
    }
    return query;
  };

  const expected = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5
  };
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{
  const message = 'handle function that returns another query (object type)';
  const target = [
    {
      isSecret: false,
      content: 'content 1',
      attachedImages: [
        'uri 1',
        'uri 2',
        'uri 3'
      ],
      createdAt: '2017-09-20',
      writer: {
        name: 'Kim',
        age: 2
      },
      agent: {
        isMobile: true,
        ip: '127.0.0.1'
      }
    },
    {
      isSecret: false,
      content: 'content 2',
      attachedImages: [
        'uri 1'
      ],
      createdAt: '2017-09-21',
      writer: {
        name: 'Lee',
        age: 40
      },
      agent: {
        isMobile: false,
        ip: '127.0.0.1'
      }
    },
    {
      isSecret: true,
      content: 'content 3',
      attachedImages: [],
      createdAt: '2017-09-21',
      writer: {
        name: 'Park',
        age: 20
      },
      agent: {
        isMobile: false,
        ip: '127.0.0.1'
      }
    }
  ];
  const query = {
    comment: comment => {
      if (comment.isSecret) {
        return ['isSecret', 'createdAt'];
      } else {
        return {
          isSecret: true,
          content: true,
          attachedImages: true,
          createdAt: true,
          writer: {
            name: true
          }
        };
      }
    }
  };

  const expected = [
    {
      isSecret: false,
      content: 'content 1',
      attachedImages: [
        'uri 1',
        'uri 2',
        'uri 3'
      ],
      createdAt: '2017-09-20',
      writer: {
        name: 'Kim'
      }
    },
    {
      isSecret: false,
      content: 'content 2',
      attachedImages: [
        'uri 1'
      ],
      createdAt: '2017-09-21',
      writer: {
        name: 'Lee'
      }
    },
    {
      isSecret: true,
      createdAt: '2017-09-21'
    }
  ];
  const actual = pick(target, query);

  assert.deepEqual(actual, expected, message);
}

{ // I don't like this case. it's not pick-recursively. it's filter-recursively
  const message = 'filter array element that isn\'t passed by filter function';
  const target = {
    articles: [
      {
        isDelete: true,
        content: 'content 1'
      },
      {
        isDelete: false,
        content: 'content 2'
      },
      {
        isDelete: false,
        content: 'content 3'
      }
    ]
  };
  const query = {
    articles: {
      article: article => {
        if (!article.isDelete) return 'content';
        return false;
      }
    }
  };

  const expected = {
    articles: [
      {
        content: 'content 2'
      },
      {
        content: 'content 3'
      }
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
