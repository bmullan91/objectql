/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const tap = require('tap');
const objectql = require('../');

// shortcuts
const test = tap.test;

test('if the source is undefined the result will be undefined', (t) => {
  t.plan(1);
  const source = undefined;
  const query = {
    key: true
  };
  const actual = objectql(source, query);
  const expected = undefined;
  t.equal(actual, expected);
});

test('if the source is null the result will be null', (t) => {
  t.plan(1);
  const source = null;
  const query = {
    key: true
  };
  const actual = objectql(source, query);
  const expected = null;
  t.equal(actual, expected);
});

test('if the source is a number the result will be the same number', (t) => {
  t.plan(1);
  const source = 1;
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = 1;

  t.deepEqual(actual, expected);
});

test('if the source is a string the result will be the same string', (t) => {
  t.plan(1);
  const source = 'source';
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = 'source';

  t.deepEqual(actual, expected);
});

test('if the source is true the result will be true', (t) => {
  t.plan(1);
  const source = true;
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = true;

  t.deepEqual(actual, expected);
});

test('if the source is false the result will be false', (t) => {
  t.plan(1);
  const source = false;
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = false;

  t.deepEqual(actual, expected);
});

test('if the source is a function the result will the same function', (t) => {
  t.plan(1);
  const source = function noop() {};
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('if the source is an empty object the result will be an empty object', (t) => {
  t.plan(1);
  const source = {};
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = {};

  t.deepEqual(actual, expected);
});

test('if the source is an empty array the result will be an empty array', (t) => {
  t.plan(1);
  const source = [];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [];

  t.deepEqual(actual, expected);
});

test('if the source is an array with an undefined item the result will be the same', (t) => {
  t.plan(1);
  const source = [undefined];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [undefined];

  t.deepEqual(actual, expected);
});

test('if the source is an array with null item the result will be the same', (t) => {
  t.plan(1);
  const source = [null];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [null];

  t.deepEqual(actual, expected);
});

test('if the source is an array with an empty string item the result will be the same', (t) => {
  t.plan(1);
  const source = [''];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [''];

  t.deepEqual(actual, expected);
});

test('if the source is an array with a number item the result will be the same', (t) => {
  t.plan(1);
  const source = [1];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [1];

  t.deepEqual(actual, expected);
});

test('if the source is an array with a Boolean(true) item the result will be the same', (t) => {
  t.plan(1);
  const source = [true];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [true];

  t.deepEqual(actual, expected);
});

test('if the source is an array with a Boolean(false) item the result will be the same', (t) => {
  t.plan(1);
  const source = [false];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [false];

  t.deepEqual(actual, expected);
});

test('if the source is an array with a function item the result will be the same', (t) => {
  t.plan(1);
  const fn = function noop() {};
  const source = [fn];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [fn];

  t.deepEqual(actual, expected);
});

test('if the source is an array with an empty object item the result will be the same', (t) => {
  t.plan(1);
  const source = [{}];
  const query = {
    key: true
  };

  const actual = objectql(source, query);
  const expected = [{}];

  t.deepEqual(actual, expected);
});
