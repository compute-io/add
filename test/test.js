/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate if a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	add = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-add', function tests() {

	it( 'should export a function', function test() {
		expect( add ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				add( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				add( [1,2,3], 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				add( matrix( [2,2] ), 1, {
					'dtype': value
				});
			};
		}
	});


	it( 'should throw an error if provided an array and an unsupported second summand', function test() {
		var values = [
			'5',
			true,
			undefined,
			null,
			NaN,
			{},
			function(){},
			matrix( [2,2] )
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				add( [1,2,3], value );
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unsupported second summand', function test() {
		var values = [
			'5',
			true,
			undefined,
			null,
			NaN,
			{},
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				add( matrix( [2,2] ), value );
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( add( values[ i ], 1 ) ) );
		}
	});

	it( 'should add two numbers', function test() {
		assert.strictEqual( add( 0, 3 ), 3 );
		assert.strictEqual( add( -2, 2 ), 0 );
	});

	it( 'should throw an error if provided a number and an array as the second argument', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			add( 2, [ 1, 1 ]);
		}
	});

	it( 'should perform an element-wise addtion when provided a plain array and a scalar', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = [
			1,
			2,
			3,
			4
		];

		actual = add( data, 1 );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = add( data, 1, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

	});

	it( 'should perform an element-wise addtion when provided a plain array and another array', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = [
			0,
			2,
			4,
			6
		];

		actual = add( data, data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = add( data, data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

	});

	it( 'should perform an element-wise addtion when provided a typed array and a scalar', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			1,
			2,
			3,
			4
		]);

		actual = add( data, 1 );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = add( data, 1, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 2, 3, 4 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should perform an element-wise addtion when provided a typed array and another typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			0,
			2,
			4,
			6
		]);

		actual = add( data, data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:

		actual = add( data, data, {
			'copy': false
		});
		expected = new Int8Array( [ 0, 2, 4, 6 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should perform an element-wise addition and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3 ];
		expected = new Int8Array( [ 1, 2, 3, 4 ] );

		actual = add( data, 1, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should perform an element-wise addition of a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			1,
			2,
			3,
			4
		];

		actual = add( data, 1, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = add( data, 1, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should perform an element-wise addition two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3}
		];

		actual = add( data, y, {
			'accessor': getValue
		});

		expected = [
			0,
			2,
			4,
			6
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should perform an element-wise addition of a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[3,1]},
			{'x':[4,2]},
			{'x':[5,3]},
			{'x':[6,4]}
		];

		actual = add( data, 1, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = add( data, 1, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should perform an element-wise addition using an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = add( data, y, {
			path: 'x'
		});

		expected = [
			{'x':0},
			{'x':2},
			{'x':4},
			{'x':6}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = add( data, y, {
			'path': 'x/1',
			'sep': '/'
		});
		expected = [
			{'x':[9,0]},
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,6]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should perform an element-wise addition when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Int32Array( 100 );
		d3 = new Int32Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = i + i;
			d3[ i ] = i + 1;
		}

		// Add matrix and scalar
		mat = matrix( d1, [10,10], 'int32' );
		out = add( mat, 1, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d3 );

		// Add two matrices
		mat = matrix( d1, [10,10], 'int32' );
		out = add( mat, mat, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d2 );

		// Add matrix and scalar and mutate...
		out = add( mat, 1, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should perform an element-wise addition of a scalar and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 100 );
		d2 = new Uint16Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = i + 1;
		}
		mat = matrix( d1, [10,10], 'int16' );
		out = add( mat, 1, {
			'dtype': 'uint16'
		});

		assert.strictEqual( out.dtype, 'uint16' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( add( [], 1 ), [] );
		assert.deepEqual( add( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( add( new Int8Array(), 1 ), new Float64Array() );
	});

});
