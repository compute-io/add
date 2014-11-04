Add
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise addition of a numeric array.


## Installation

``` bash
$ npm install compute-add
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var add = require( 'compute-add' );
```

#### add( arr, x )

Computes an element-wise addition of an input `array`. `x` may be either an `array` of equal length or a scalar.

``` javascript
add( [ 2, 1, 4, 2 ], 1 );
// returns [ 3, 2, 5, 3 ]

add( [ 2, 1, 4, 2 ], [ 1, 2, 3, 3 ] );
// returns [ 3, 3, 7, 5 ]
```


## Examples

``` javascript
var add = require( 'compute-add' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

add( data, 10 );

console.log( data.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

This function mutates the input `array`. If mutation is undesired,

``` javascript
var data = [ 1, 2, 3, 4 ],
	copy = data.slice();

add( copy, 3.14 );
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-add.svg
[npm-url]: https://npmjs.org/package/compute-add

[travis-image]: http://img.shields.io/travis/compute-io/add/master.svg
[travis-url]: https://travis-ci.org/compute-io/add

[coveralls-image]: https://img.shields.io/coveralls/compute-io/add/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/add?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/add.svg
[dependencies-url]: https://david-dm.org/compute-io/add

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/add.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/add

[github-issues-image]: http://img.shields.io/github/issues/compute-io/add.svg
[github-issues-url]: https://github.com/compute-io/add/issues
