/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const tap = require('tap');
const objectql = require('../');

// shortcuts
const test = tap.test;

test('it should return the same source if the query is null', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = null;
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is an empty string', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = '';
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is a number', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = 1;
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is undefined', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = undefined;
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is true', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = true;
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is false', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = false;
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is a function', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = function noop() {};
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is an array', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = [];
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return an empty source if the query is an empty object', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {};
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

// query is an object - but the key values must only be 'true'

test('it should ignore query keys when their value is null', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: null
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is an empty string', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: ''
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is a number', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: 1
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is undefined', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: undefined
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is false', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: false
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is a function', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: function noop() {}
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should ignore query keys when their value is an array', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: []
  };
  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('it should return the key & value if its not an object/array that the query expected', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: {
      random: true
    }
  };
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});

test('it should return the same source key value if the query key value is true', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = {
    key: true
  };
  const actual = objectql(source, query);
  const expected = {
    key: 'value'
  };

  t.deepEqual(actual, expected);
});
