[![Build Status](https://travis-ci.org/bmullan91/objectql.svg?branch=master)](https://travis-ci.org/bmullan91/objectql) [![Coverage Status](https://coveralls.io/repos/github/bmullan91/objectql/badge.svg?branch=master)](https://coveralls.io/github/bmullan91/objectql?branch=master)

# objectql

`npm install objectql --save`

## why?

Performance. Reducing an API payload, picking only what you actually need means less data sent over the wire and therefore less data to stringify or parse.

## usage


### `objectql(source, query)`

__source__ must be an object or an array:

```js
const query = {
  a: true
};

// invalid source values
objectql(null, query); // returns null
objectql(undefined, query); // returns undefined
objectql('', query); // returns ''
objectql(10, query); // returns 10
objectql(true, query); // returns true
objectql(false, query); // returns false
objectql(function noop() {}, query); // returns noop function

// valid source values
objectql({}, query); // returns {}
objectql({ b: 'b', c: 'c' }, query); // returns {}
objectql({ a: 'a', b: 'b'}, query); // returns { a: 'a'}
objectql([], query); // returns []
objectql([{ a: 'a', b: 'b'}, { b: 'b', c: 'c' }], query); // returns [{ a: 'a'}, {}]
```

__query__ must be an object, and only the keys where the value is `true` will be used.

```js
const source = {
  a: 'a',
  b: 'b'
};

// invalid query values
objectql(source, null); // returns source
objectql(source, undefined); // returns source
objectql(source, ''); // returns source
objectql(source, 10); // returns source
objectql(source, true); // returns source
objectql(source, false); // returns source
objectql(source, function noop() {}); // returns source
objectql(source, { a: null }); // returns source
objectql(source, { a: undefined }); // returns source
objectql(source, { a: '' }); // returns source
objectql(source, { a: 10 }); // returns source
objectql(source, { a: false }); // returns source
objectql(source, { a: function noop() {} }); // returns source


// valid query values
objectql(source, { a: true }); // returns { a: 'a' }
objectql(source, { b: true }); // returns { b: 'b' }
objectql(source, { a: true, b: true }); // returns { a: 'a', b: 'b' }
```

## examples

The query object follows a similar pattern to a 'simple' graphql query, for each key in the query `objectql` will pick the matching key from the source object when the query value is `true`.

```js
const source = {
  id: 'abc123'
  name: 'Brian',
  age: 24,
  username: 'bmullan91'
};

const query = {
  id: true,
  username: true
};

const result = objectql(source, query);

// result will be:

{
  id: 'abc123',
  username: 'bmullan91'
}
```

__arrays__

If given an array `objectql` will iterate over each item and apply the query to each item.

```js
const source = [
  {
    a: 'a',
    b: {
      c: [
        {
          d: 'd',
          z: 'meh'
        },
        {
          d: 'd',
          z: 'meh'
        }
      ]
    }
  },
  {
    a: 'a',
    b: {
      c: [
        {
          d: 'd',
          z: 'meh'
        },
        {
          d: 'd',
          z: 'meh'
        }
      ]
    }
  }
];
const query = {
  b: {
    c: {
      d: true
    }
  }
};

const result = objectql(source, query);

// result will be:

[
  {
    b: {
      c: [
        {
          d: 'd'
        },
        {
          d: 'd'
        }
      ]
    }
  },
  {
    b: {
      c: [
        {
          d: 'd'
        },
        {
          d: 'd'
        }
      ]
    }
  }
]
```

__falsey values__

If the source object is not an object or an array it will be returned back as the result.

```js
const source = null;
const query = {
  a: {
    b: {
      c: true
    }
  }
};

const result = objectql(source, query);

// result will be:

null
```

The same is true if the invalid value is deeper in the source object:

```js
const source = {
  a: {
    b: null
  }
};
const query = {
  a: {
    b: {
      c: true
    }
  }
};

const result = objectql(source, query);

// result will be:

{
  a: {
    b: null
  }
}
```

__real life example__

This should help visualise the data with useful key names.

```js
const source = {
  id: '123',
  modelName: 'model',
  url: 'url',
  date: 1471865716619,
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
      modelName: 'post',
      url: 'url',
      date: 1471865716619,
      photos: [
        {
          id: '123',
          url: 'url'
        }
      ]
    },
    {
      id: '789',
      modelName: 'post',
      url: 'url',
      date: 1471865716619,
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
const result = objectql(source, query);

// result will be:
{
  id: '123',
  items: [
    {
      modelName: 'post',
      url: 'url',
      photos: [
        {
          url: 'url'
        }
      ]
    },
    {
      modelName: 'post',
      url: 'url',
      photos: [
        {
          url: 'url'
        }
      ]
    }
  ]
};
```

Still not sure, take a look at the [tests](https://github.com/bmullan91/objectql/tree/master/test) for more examples.
