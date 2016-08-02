const tape = require('tape');
const trimObject = require('../');

// shortcuts
const test = tape.test;

test('it should return the same data if its falsey', function(t) {
  t.plan(1);
  const data = null;
  const actual = trimObject(data);
  const expected = data;
  t.equal(actual, expected);
});

test('if no trimmer object passed returns original object', function(t) {
  t.plan(1);
  const data = {a: 'a', b: ['b'], c: { d: 'd'} };
  const actual = trimObject(data);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('it should throw an error if trimmer.$whiteList isn\'t and array', function(t) {
  t.plan(1);
  t.throws(trimObject.bind(null, {}, { $whiteList: 'bla' }))
});

test('empty whiteList in trimmer object', function(t) {
  t.plan(1);
  const trimmer = {
    $whiteList: []
  };

  const data = {
    a: 'a',
    b: 'b'
  };

  const actual = trimObject(data, trimmer);
  const expected = {};

  t.deepEqual(actual, expected, 'should be empty - since the $whiteList array was empty');
});

test('it should pick string-keys from the $whiteList array', function(t) {
  t.plan(1);

  const data = {
    a: 'a',
    b: 'b',
    c: 'c'
  };
  const whiteList = ['a', 'b'];

  const actual = trimObject(data, { $whiteList: whiteList });
  const expected = {
    a: 'a',
    b: 'b'
  };

  t.deepEqual(actual, expected);
});

test('it should operate on other keys in the trimmer object recursively', function(t) {
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
    },
  };
  const actual = trimObject(data, {
    $whiteList: ['b'],
    b: {
      $whiteList: ['c'],
      c: {
        $whiteList: ['d']
      }
    }
  });
  const expected = {
    b: {
      c: {
        d: 'd'
      }
    },
  }

  t.deepEqual(actual, expected);
});

test('it should operate on other keys in the trimmer object recursively - iterate over arrays', function(t) {
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
    ],
  };
  const actual = trimObject(data, {
    $whiteList: ['b'],
    b: {
      $whiteList: ['c'],
      c: {
        $whiteList: ['d']
      }
    }
  });
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
    ],
  };

  t.deepEqual(actual, expected);
});

test('real life example', function(t) {
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
  const trimObjectConfig = {
    $whiteList: ['id', 'items'],
    items: {
      $whiteList: ['modelName', 'url', 'photos'],
      photos: {
        $whiteList: ['url']
      }
    }
  };
  const actual = trimObject(data, trimObjectConfig);
  const expected =  {
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
