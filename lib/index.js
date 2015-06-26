'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var add1 = require( './array.js' ),
	add2 = require( './accessor.js' ),
	add3 = require( './deepset.js' ),
	add4 = require( './matrix.js' ),
	add5 = require( './typedarray.js' );


// ADD //

/**
* FUNCTION: add( x, y[, opts] )
*	Computes an element-wise addition.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} y - either an array or matrix of equal dimension or a scalar
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} added value(s)
*/
function add( x, y, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;
	// Handle cases where first argument is a number
	if ( isNumber( x ) || isnan( x ) ) {
		for ( var key in options ) {
			if ( key !== 'dtype' ){
				throw new Error( 'add()::only dtype option is applicable when first argument is not array- or matrix-like. Keys: `' + Object.keys( options ) + '`.' );
			}
		}
		if ( isArrayLike( y ) ) {
			return options ? add( y, x, options ) : add( y, x );
		}
		if ( !isNumber( y ) ) {
			return NaN;
		}
		return x + y;
	}
	// Validate options
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'add()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return add4( out, x, y );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'erf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return add5( out, x, y );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return add3( x, y, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'add()::invalid input argument. Unrecognized/unsupported array-like object. Provide either a plain or typed array. Value: `' + x + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return add2( out, x, y, opts.accessor );
		}
		return add1( out, x, y );
	}
	return NaN;
} // end FUNCTION add()


// EXPORTS //

module.exports = add;
