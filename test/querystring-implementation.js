/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const tap = require('tap');
const objectql = require('../');

// shortcuts
const test = tap.test;

test('it ignore query keys that arent present in source object', t => {
  t.plan(1);
  const source = {
    a: 'a',
    b: 'b'
  };
  const query = `{
    a
    x {
      y {
        z
      }
    }
  }`;

  const actual = objectql(source, query);
  const expected = {
    a: 'a'
  };

  t.deepEqual(actual, expected);
});

test('it should return null if is source is null', t => {
  t.plan(1);
  const source = {
    a: 'a',
    b: 'b',
    x: {
      y: null
    }
  };
  const query = `{
    a
    x {
      y {
        z
      }
    }
  }`;

  const actual = objectql(source, query);
  const expected = {
    a: 'a',
    x: {
      y: null
    }
  };

  t.deepEqual(actual, expected);
});

test('it should pick entire values when the key is true', t => {
  t.plan(1);

  const source = {
    a: 'a',
    b: [1, 2, 3],
    c: {
      d: {
        e: 'f'
      }
    },
    g: 'meh',
    h: false
  };
  const query = '{a,b,c,g,h}';

  const expected = Object.assign({}, source);
  const actual = objectql(source, query);

  t.deepEqual(actual, expected);
});

test('it should operate on other keys in the query object recursively', t => {
  t.plan(1);

  const source = {
    meh: 'to be trimed',
    a: 'a',
    b: {
      meh: 'to be trimed',
      c: {
        meh: 'to be trimed',
        d: 'd'
      }
    }
  };
  const query = '{b{c{d}}}';

  const actual = objectql(source, query);
  const expected = {
    b: {
      c: {
        d: 'd'
      }
    }
  };

  t.deepEqual(actual, expected);
});

test('it should iterate over arrays and apply the query for each item', t => {
  t.plan(1);

  const source = {
    meh: 'to be trimed',
    b: [
      {
        meh: 'to be trimed',
        c: {
          d: 'd'
        }
      },
      {
        meh: 'to be trimed',
        c: {
          d: 'd'
        }
      }
    ]
  };
  const query = `{
    b {
      c { d }
    }
  }`;

  const actual = objectql(source, query);
  const expected = {
    b: [
      {
        c: {
          d: 'd'
        }
      },
      {
        c: {
          d: 'd'
        }
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test('it should recursively iterate over arrays', t => {
  t.plan(1);

  const source = [
    [
      {
        a: 'a',
        b: {
          c: [
            {
              d: 'd',
              e: 'meh'
            }
          ]
        },
        z: 123
      },
      {
        a: 'a',
        b: {
          c: [
            {
              d: 'd',
              e: 'meh'
            }
          ]
        },
        z: 456
      }
    ]
  ];

  const query = `{
    a
    b {
      c {
        d
      }
    }
  }`;

  const actual = objectql(source, query);
  const expected = [
    [
      {
        a: 'a',
        b: {
          c: [
            {
              d: 'd'
            }
          ]
        }
      },
      {
        a: 'a',
        b: {
          c: [
            {
              d: 'd'
            }
          ]
        }
      }
    ]
  ];

  t.deepEqual(actual, expected);
});

test('real life example', t => {
  t.plan(1);

  const source = {
    id: '123',
    modelName: 'model',
    url: 'url',
    date: Date.now(),
    random: 'random',
    photos: [
      {
        id: '123',
        abc: 'abc'
      }
    ],
    items: [
      {
        id: '456',
        modelName: 'model',
        url: 'url',
        date: Date.now(),
        photos: [
          {
            id: '123',
            url: 'url'
          }
        ]
      },
      {
        id: '789',
        modelName: 'model',
        url: 'url',
        date: Date.now(),
        photos: [
          {
            id: '123',
            url: 'url'
          }
        ]
      }
    ]
  };
  const query = `{
    id,
    items {
      modelName,
      url,
      photos {
        url
      }
    }
  }`;
  const actual = objectql(source, query);
  const expected = {
    id: '123',
    items: [
      {
        modelName: 'model',
        url: 'url',
        photos: [
          {
            url: 'url'
          }
        ]
      },
      {
        modelName: 'model',
        url: 'url',
        photos: [
          {
            url: 'url'
          }
        ]
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test('it should parse with space insensitivity', t => {
  t.plan(5);

  const source = {
    meh: 'to be trimed',
    a: 'a',
    b: {
      meh: 'to be trimed',
      c: 'c',
      d: {
        meh: 'to be trimed',
        e: 'e'
      }
    }
  };
  const queries = ['{a}', '{ a}', '{a }', '{ a }'];
  let expected = { a: 'a' };
  for (const query of queries) {
    const actual = objectql(source, query);
    t.deepEqual(actual, expected);
  }

  const query = '{a b{ c d { e }} }';
  const actual = objectql(source, query);
  expected = {
    a: 'a',
    b: {
      c: 'c',
      d: {
        e: 'e'
      }
    }
  };

  t.deepEqual(actual, expected);
});

test('it should throw if the query is an unparseable string', t => {
  t.plan(2);
  const source = {
    key: 'value'
  };
  const queries = ['', '{ hello }}'];

  for (const query of queries) {
    t.throws(() => {
      objectql(source, query);
    });
  }
});
