/**
*
*	COMPUTE: add
*
*
*	DESCRIPTION:
*		- Computes an element-wise addition of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// ADD //

/**
* FUNCTION: add( arr, x )
*	Computes an element-wise addition of an array.
*
* @param {Array} arr - numeric array
* @param {Array|Number} x - either an array of equal length or a scalar
*/
function add( arr, x ) {
	var isArray = Array.isArray( x ),
		len,
		i;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'add()::invalid input argument. Must provide an array.' );
	}
	len = arr.length;
	if ( !isArray && ( typeof x !== 'number' || x !== x ) ) {
		throw new TypeError( 'add()::invalid input argument. Second argument must be either an array or a scalar.' );
	}
	if ( isArray ) {
		if ( len !== x.length ) {
			throw new Error( 'add()::invalid input argument. Arrays must be of equal length.' );
		}
		for ( i = 0; i < len; i++ ) {
			arr[ i ] += x[ i ];
		}
		return;
	}
	for ( i = 0; i < len; i++ ) {
		arr[ i ] += x;
	}
} // end FUNCTION add()


// EXPORTS //

module.exports = add;
