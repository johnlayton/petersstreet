var tape = require( 'tape' );

var unpack = require( 'ndarray-unpack' );
var pack = require( 'ndarray-pack' );

var interp = require( '../../petersstreet/lib/allimaavenue.interp.js' );


tape( "Simple simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                 ] );
  var idx = [
    { idx: [ 0, 1, 2 ], pnt: 0.5 },
    { idx: [ 0, 1, 2 ], pnt: 1.5 }
  ];

  test.equals( interp( nd, idx ), 4 );

  test.end();
} );

tape( "Simple simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                 ] );
  var idx = [
    { idx: [ 0, 1, 2 ], pnt: 0.5 },
    { idx: [ 2, 1, 0 ], pnt: 0.5 }
  ];

  test.equals( interp( nd, idx ), 4 );

  test.end();
} );


tape( "Simple simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                 ] );
  var idx = [
    { idx: [ 10, 11, 12 ], pnt: 10.5 },
    { idx: [ 10, 11, 12 ], pnt: 11.5 }
  ];

  test.equals( interp( nd, idx ), 4 );

  test.end();
} );

tape( "Simple simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                 ] );
  var idx = [
    { idx: [ 0, 1, 2 ], pnt: 0 },
    { idx: [ 0, 1, 2 ], pnt: 0 }
  ];

  test.equals( interp( nd, idx ), 1 );

  test.end();
} );

tape( "Simple simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
                   [ 1, 2, 3 ],
                   [ 4, 5, 6 ],
                   [ 7, 8, 9 ]
                 ] );
  var idx = [
    { idx: [ 0, 1, 2 ], pnt: 2 },
    { idx: [ 0, 1, 2 ], pnt: 2 }
  ];

  test.equals( interp( nd, idx ), 9 );

  test.end();
} );

tape( "Simple less simple hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
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
                 ] );
  var idx = [
    { idx: [ 0, 1 ],    pnt: 0.75 },
    { idx: [ 0, 1, 2 ], pnt: 0 },
    { idx: [ 0, 1, 2 ], pnt: 0 }
  ];

  test.equals( interp( nd, idx ), 8.5 );

  test.end();
} );

tape( "Simple less simple reverse hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
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
                 ] );
  var idx = [
    { idx: [ 0, 1 ],    pnt: 0 },
    { idx: [ 2, 1, 0 ], pnt: 0 },
    { idx: [ 0, 1, 2 ], pnt: 2 }
  ];

  test.equals( interp( nd, idx ), 9 );

  test.end();
} );

tape( "Simple less simple reverse hi/lo", function ( test ) {
  test.plan( 1 );

  var nd = pack( [
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
                 ] );
  var idx = [
    { idx: [ 0, 1 ],      pnt: 0 },
    { idx: [ -2, -1, 0 ], pnt: -2 },
    { idx: [ 0, 1, 2 ],   pnt: 2 }
  ];

  test.equals( interp( nd, idx ), 3 );

  test.end();
} );