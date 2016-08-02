# trim-object

## TODO:

- [ ] confirm API
- [ ] publish

## usage

```js
const trimObject = require('trim-object');

const myBigObject = {
  id: '123',
  thing: 'thing',
  photos: {
    id: 'abc',
    title: 'title',
    url: '//url'
  },
  items: [
    {
      id: '456',
      model: 'model',
      url: '//url',
      photos: [
        {
          id: '789',
          title: 'title',
          url: '//url'
        }
      ]
    }
  ]
};

const trimObjectConfig = {
  $whiteList: ['id', 'photos', 'items'],
  photos: {
    $whiteList: ['url']
  },
  items: {
    $whiteList: ['url', 'photos'],
    photos: {
      $whiteList: ['url']
    }
  }
};

const trimmedObject = trimObject(myBigObject, trimObjectConfig);

console.log(trimmedObject);
// result
{
  "id": "123",
  "photos": {
    "url": "//url"
  },
  "items": [
    {
      "url": "//url",
      "photos": [
        {
          "url": "//url"
        }
      ]
    }
  ]
}
```

### Alternative API ?

```js
const trimObjectConfig = {
  id: true, // yes - I want 'all' of this key, whatever its data-type
  photos: {
    // I want pick a subset of keys from the object 'photos', only 'url' in this case
    url: true
  },
  items: {
    url: true,
    photos: {
      url: true
    }
  }
};
```
