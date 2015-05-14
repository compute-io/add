Add
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise addition.


## Installation

``` bash
$ npm install compute-add
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var add = require( 'compute-add' );
```

#### add( arr, x[, opts] )

Computes an element-wise addition. `x` may be either an `array` of equal length or a `numeric` scalar.

``` javascript
var arr = [ 2, 1, 4, 2 ],
	out;

out = add( arr, 1 );
// returns [ 3, 2, 5, 3 ]

out = add( arr, [ 1, 2, 3, 3 ] );
// returns [ 3, 3, 7, 5 ]
```

The function accepts the following `options`:

*  __copy__: `boolean` indicating whether to return a new `array`. Default: `true`.
*  __accessor__: accessor `function` for accessing values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 5, 3, 8, 3, 2 ];

var out = add( arr, 4, {
	'copy': false
});
// returns [ 9, 7, 12, 7, 6 ]

console.log( arr === out );
// returns true
```

__Note__: mutation is the `array` equivalent of an __add-equal__ (`+=`).

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = add( data, 4, {
	'accessor': getValue
});
// returns [ 9, 7, 12, 7, 6 ]
```

When adding values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 4},
	{'x': 5},
	{'x': 6},
	{'x': 5},
	{'x': 3}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = add( data, arr, {
	'accessor': getValue
});
// returns [ 9, 8, 14, 8, 5 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second (comparison) input `array`.





## Examples

``` javascript
var add = require( 'compute-add' );

// Simulate some data...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

var out = add( data, 10 );

console.log( out.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


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
