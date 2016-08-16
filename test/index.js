/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const tape = require('tape');
const objectql = require('../');

// shortcuts
const test = tape.test;

test('it should return the same data if its falsey', (t) => {
  t.plan(1);
  const data = null;
  const actual = objectql(data);
  const expected = data;
  t.equal(actual, expected);
});

test('it should return the same object if the query is undefined', (t) => {
  t.plan(1);
  const data = {
    a: 'a',
    b: ['b'],
    c: {
      d: 'd'
    }
  };
  const actual = objectql(data);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('it should return the same object if the query is null', (t) => {
  t.plan(1);
  const data = {
    a: 'a',
    b: ['b'],
    c: {
      d: 'd'
    }
  };
  const actual = objectql(data, null);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('it should return the same object if the query is an empty string', (t) => {
  t.plan(1);
  const data = {
    a: 'a',
    b: ['b'],
    c: {
      d: 'd'
    }
  };
  const actual = objectql(data, '');
  const expected = data;

  t.deepEqual(actual, expected);
});

test('it should return an empty object if the query is an empty object', (t) => {
  t.plan(1);
  const data = {
    a: 'a',
    b: ['b'],
    c: {
      d: 'd'
    }
  };

  const actual = objectql(data, {});
  const expected = {};

  t.deepEqual(actual, expected);
});


test('it should pick entire values when the key is true', (t) => {
  t.plan(1);

  const data = {
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
  const query = {
    a: true,
    b: true,
    c: true,
    g: true,
    h: true
  };

  const actual = objectql(data, query);
  const expected = Object.assign({}, data);

  t.deepEqual(actual, expected);
});

test('it should operate on other keys in the trimmer object recursively', (t) => {
  t.plan(1);

  const data = {
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
  const query = {
    b: {
      c: {
        d: true
      }
    }
  };

  const actual = objectql(data, query);
  const expected = {
    b: {
      c: {
        d: 'd'
      }
    }
  };

  t.deepEqual(actual, expected);
});

test('it should iterate over arrays and apply the query for each item', (t) => {
  t.plan(1);

  const data = {
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
  const query = {
    b: {
      c: {
        d: true
      }
    }
  };

  const actual = objectql(data, query);
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

test('real life example', (t) => {
  t.plan(1);

  const data = {
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
  const query = {
    id: true,
    items: {
      modelName: true,
      url: true,
      photos: {
        url: true
      }
    }
  };
  const actual = objectql(data, query);
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
