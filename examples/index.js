'use strict';

var add = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
var out = add( data, 10 );

console.log( out.join( '\n' ) );
