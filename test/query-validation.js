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
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is an empty string', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = '';
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is a number', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = 1;
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is undefined', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = undefined;
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is true', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = true;
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is false', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = false;
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is a function', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = function noop() {};
  const actual = objectql(source, query);
  const expected = source;

  t.deepEqual(actual, expected);
});

test('it should return the same source if the query is an array', (t) => {
  t.plan(1);
  const source = {
    key: 'value'
  };
  const query = [];
  const actual = objectql(source, query);
  const expected = source;

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
