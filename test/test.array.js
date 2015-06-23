/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	add = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array add', function tests() {

	it( 'should export a function', function test() {
		expect( add ).to.be.a( 'function' );
	});

	it( 'should add a scalar to an array', function test() {
		var data, actual, expected;

		data = [
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = add( actual, data, 1 );

		expected = [
			2,
			3,
			4,
			5,
			6
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = add( actual, data, 1 );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should add an array to an array', function test() {
		var data, actual, expected, y;

		data = [
			1,
			2,
			3,
			4,
			5
		];

	 	y = [
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = add( actual, data, y );

		expected = [
			2,
			4,
			6,
			8,
			10
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = add( actual, data, y );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( add( [], [], 1 ), [] );
		assert.deepEqual( add( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = add( actual, data, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, 4 ];
		actual = add( actual, data, y );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if provided an array to be added which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			add( [], [1,2], [1,2,3] );
		}
	});

});
