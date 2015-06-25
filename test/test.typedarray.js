/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	add = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array add', function tests() {

	it( 'should export a function', function test() {
		expect( add ).to.be.a( 'function' );
	});

	it( 'should add elements of two typed arrays', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			0.75,
			0.5,
			0.25,
			0.1
		]);
		y = new Float64Array([
			0.25,
			0.5,
			0.75,
			0.9
		]);
		actual = new Float64Array( data.length );

		actual = add( actual, data, y );

		expected = new Float64Array( [1,1,1,1] );

		assert.deepEqual( expected, actual );
	});

	it( 'should throw an error if provided two typed arrays of differing lengths', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			add( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			add( new Array(2), new Int8Array( [1,2] ), [ 1, 2, 3 ] );
		}
	});

	it( 'should handle non-numeric y values by setting the respective element to NaN', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			0.75,
			0.5,
			0.25,
			0.1
		]);
		actual = new Array( data.length );
		actual = add( actual, data, null );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 0.25, 0.5, 0.75, null ];
		actual = add( actual, data, y );

		expected = [ 1, 1, 1, NaN ];

		assert.deepEqual( actual, expected );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( add( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
