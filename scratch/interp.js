#!/usr/bin/env node

var unpack = require( 'ndarray-unpack' );
var pack = require( 'ndarray-pack' );

var interp = require( '../../petersstreet/lib/allimaavenue.interp.js' );

console.log( interp( pack( [
                             [ 1, 2, 3 ],
                             [ 4, 5, 6 ],
                             [ 7, 8, 9 ]
                           ] ), [
                       { idx : [ 10, 11, 12 ], pnt : 11.5 },
                       { idx : [ 10, 11, 12 ], pnt : 11.5 }
                     ] ) );
/*
console.log( interp( pack( [
                             [ 1, 1, 0 ],
                             [ 1, 1, 0 ],
                             [ 0, 0, 0 ]
                           ] ), [
                       { idx : [ 0, 1, 2 ], pnt : 0.5 },
                       { idx : [ 0, 1, 2 ], pnt : 0.5 }
                     ] ) );

console.log( interp( pack( [
                             [ 0, 1, 1 ],
                             [ 0, 1, 1 ],
                             [ 0, 0, 0 ]
                           ] ), [
                       { idx : [ 0, 1, 2 ], pnt : 1.5 },
                       { idx : [ 0, 1, 2 ], pnt : 0.5 }
                     ] ) );

console.log( interp( pack( [
                             [
                               [ 1, 2, 3 ],
                               [ 4, 5, 6 ],
                               [ 7, 8, 9 ]
                             ],
                             [
                               [ 11, 12, 13 ],
                               [ 14, 15, 16 ],
                               [ 17, 18, 19 ]
                             ]
                           ] ), [
                       { idx : [ 0, 1 ],    pnt : 0.5 },
                       { idx : [ 0, 1, 2 ], pnt : 1.8 },
                       { idx : [ 0, 1, 2 ], pnt : 0.87 }
                     ] ) );

console.log( interp( pack( [
                             [
                               [ 1, 1, 0 ],
                               [ 1, 1, 0 ],
                               [ 0, 0, 0 ]
                             ],
                             [
                               [ 0, 1, 1 ],
                               [ 0, 1, 1 ],
                               [ 0, 0, 0 ]
                             ]
                           ] ), [
                       { idx : [ 0, 1 ],    pnt : 0.5 },
                       { idx : [ 0, 1, 2 ], pnt : 0.5 },
                       { idx : [ 0, 1, 2 ], pnt : 1.5 }
                     ] ) );

console.log( interp( pack( [
                             [
                               [ 1, 1, 0 ],
                               [ 1, 1, 0 ],
                               [ 0, 0, 0 ]
                             ],
                             [
                               [ 0, 1, 1 ],
                               [ 0, 1, 1 ],
                               [ 0, 0, 0 ]
                             ]
                           ] ), [
                       { idx : [ 0, 1 ],    pnt : 0 },
                       { idx : [ 0, 1, 2 ], pnt : 0 },
                       { idx : [ 0, 1, 2 ], pnt : 0 }
                     ] ) );

console.log( interp( pack( [
                             [
                               [ 1, 1, 0 ],
                               [ 1, 1, 0 ],
                               [ 0, 0, 0 ]
                             ],
                             [
                               [ 0, 1, 1 ],
                               [ 0, 1, 1 ],
                               [ 0, 0, 0 ]
                             ]
                           ] ), [
                       { idx : [ 0, 1 ],    pnt : 1 },
                       { idx : [ 0, 1, 2 ], pnt : 1 },
                       { idx : [ 0, 1, 2 ], pnt : 2 }
                     ] ) );
  */