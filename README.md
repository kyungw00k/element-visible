# element-visible

[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][js-standard-image]][js-standard-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][npm-download]][npm-url]

[js-standard-url]: http://standardjs.com/
[js-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[npm-url]: https://npmjs.org/package/element-visible
[npm-image]: https://img.shields.io/npm/v/element-visible.svg?style=flat-square
[npm-download]: https://img.shields.io/npm/dm/element-visible.svg?style=flat-square

[travis-url]: https://travis-ci.org/kyungw00k/element-visible
[travis-image]: https://img.shields.io/travis/kyungw00k/element-visible/master.svg?style=flat-square

> Determine if an element is visible

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i element-visible --save-dev
```

## Usage

This basic check will return true if the entire element is visible to the user (within the visual viewport).

```js
var elementVisible = require('element-visible')
var element = document.getElementById('targetElementId')

if (elementVisible(element)) {
    console.log('I\'m visible')
}

```

If you'd like to check the certain percent of the element, you can use the following:

```js
var elementVisible = require('element-visible')
var element = document.getElementById('targetElementId')

if (elementVisible(element, 0.5)) { /* at least 50% of its area is in the users viewport */
    console.log('I\'m visible')
}
```

## API

### elementVisible(element [, threshold])
`true` if element is visible and the visible percentage of element is equal or above the `threshold`
- `threshold` (_default: 1_) -  if percentage is equal or above this limit the element is considered fully visible

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm run test:local
```

### Tested
* IE 6+
* Chrome latest
* Safari latest
* Firefox latest
* iOS 8.1+
* Android 4.0+

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/kyungw00k/element-visible/issues)

## License
[MIT](https://kyungw00k.mit-license.org/)
