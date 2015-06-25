'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory;


// ADD //

/**
* FUNCTION: add( arr, y, path[, sep] )
*	Computes an element-wise addition or each element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function add( x, y, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		v, i;

	if ( arguments.length > 3 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		if ( isArray( y ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( x[ i ] );
				if ( typeof v === 'number' && typeof y[ i ] === 'number') {
					dset( x[ i ], v + y[ i ] );
				} else {
					dset( x[ i ], NaN );
				}
			}
		} else {
			if ( typeof y === 'number' ) {
				for ( i = 0; i < len; i++ ) {
					v = dget( x[ i ] );
					if ( typeof v === 'number' ) {
						dset( x[ i ], v + y );
					} else {
						dset( x[ i ], NaN );
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					dset( x[ i ], NaN );
				}
			}
		}
	}
	return x;
} // end FUNCTION add()


// EXPORTS //

module.exports = add;
