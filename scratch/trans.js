#!/usr/bin/env node

var NetCDFParser = require( './../lib/allimaavenue.parser.js' )
var LoggingStream = require( './../../petersstreet/lib/allimaavenue.logging.js' )

var get = require( './../../petersstreet/lib/allimaavenue.get.js' )
var find = require( './../../petersstreet/lib/allimaavenue.ndarray.js' )
var interp = require( './../../petersstreet/lib/allimaavenue.interp.js' )
var transform = require( './../../petersstreet/lib/allimaavenue.transform.js' )
var show = require( 'ndarray-show' );
var imshow = require( 'ndarray-imshow' );
var cmap = require( 'apply-colormap' );
var save = require( "save-pixels" );
var select = require( "ndarray-select" );
var pack = require( 'ndarray-pack' );
var unpack = require( 'ndarray-unpack' );
var ndarray = require( 'ndarray' );
var util = require( 'util' );
var fs = require( 'fs' );
var q = require( 'q' );

var fs_options = { highWaterMark : 10 * 1024 * 1024 };

var read = function ( filename ) {
  var deferred = q.defer();

  fs.readFile( filename, fs_options, function ( err, data ) {
    new NetCDFParser().on( "data", function ( data ) {
      deferred.resolve( data );
    } ).parse( data, 'utf-8', function () {
    } );
  } );

  return deferred.promise;
};

/*
 read( "./data/icc_districts.nc" ),
 read( "./data/IDV71000_VIC_T_SFC.nc" ),
 read( "./data/fuel_load.nc" ),
 */
q.allSettled( [ read( "./data/icc_districts.nc" ) ] ).then( function ( result ) {

  //result.forEach( function( itm ) { console.log( value.variables ) } )
  //console.log`

  //console.log( result[2].value.variables[2].variable );
  //
  //console.log( result[2].value.variables[0].variable );
  //console.log( result[2].value.variables[1].variable );
  //
  //console.log( result[1].value.variables[0].variable );
  //console.log( result[1].value.variables[1].variable );
  //
  console.log( "Parsed ready to transform" );

  //var pic = require( './../lib/allimaavenue.transform.js' )( result[2].value.variables[2].data,
  //                                                           result[2].value.variables[0].data,
  //                                                           result[2].value.variables[1].data,
  //                                                           result[1].value.variables[0].data,
  //                                                           result[1].value.variables[1].data );

  //console.log( result );

  //private Rectangle2D.Double _extent = new Rectangle.Double( 2126760, 2261958, 2939700 - 2126760, 2827038 - 2261958 );
  //private Rectangle2D.Double _extent = new Rectangle.Double( 140.903, -39.750, 151.009 - 140.903, -33.933 - -39.750 );
  //--extent 2100000,2200000,3000000,2857038
  var extent = {
    lb : { x : 2126760, y : 2827038 },
    rt : { x : 2939700, y : 2261958 }
  };
  var cell = 510;
  var cell = 1000;
  //var cell = 4080;

  var xdim = Math.round( ( extent.rt.x - extent.lb.x ) / cell );
  var ydim = Math.round( ( extent.lb.y - extent.rt.y ) / cell );

  var ydata = ndarray( new Int32Array( xdim ), [ xdim ] );
  var xdata = ndarray( new Int32Array( ydim ), [ ydim ] );

  for ( i = 0; i < xdim; i++ ) {
    ydata.set(i, extent.lb.x + ( i * cell ) );
  }

  for ( i = 0; i < ydim; i++ ) {
    xdata.set(i, extent.lb.y - ( i * cell ) );
  }

  console.log( result[0].value.variables[2].variable );
  console.log( result[0].value.variables[0].data );
  console.log( result[0].value.variables[1].variable );

  //var pic = require( './../lib/allimaavenue.transform.js' )( result[0].value.variables[0].data.pick( 92 ),
  //                                                           result[0].value.variables[1].data, // X-Data (Latitude)
  //                                                           result[0].value.variables[2].data, // Y-Data (Longitude)
  //                                                           xdata,
  //                                                           ydata );
  var pic = require( './../../petersstreet/lib/allimaavenue.transform.js' )( result[0].value.variables[2].data,
                                                             result[0].value.variables[0].data, // X-Data (Latitude)
                                                             result[0].value.variables[1].data, // Y-Data (Longitude)
                                                             xdata,
                                                             ydata );

  var repl = require( 'repl' ).start( {
                                        prompt : "-> ",
                                        input  : process.stdin,
                                        output : process.stdout
                                      } );
  repl.context.result = result;
  repl.context.pic = pic;
  repl.context.xdata = xdata;
  repl.context.ydata = ydata;

  var ops = require( 'ndarray-ops' );

  var min = get( result[0].value.variables[2].data, ops.argmin( result[0].value.variables[2].data ) );
  var max = get( result[0].value.variables[2].data, ops.argmax( result[0].value.variables[2].data ) );

  //require( 'ndarray-imshow' )( require( 'apply-colormap' )( result[0].value.variables[0].data.pick( 92 ) ) );
  //require( 'ndarray-imshow' )( require( 'apply-colormap' )( result[1].value.variables[2].data ) );
  //require( 'ndarray-imshow' )( require( 'apply-colormap' )( result[2].value.variables[0].data ) );
  require( 'ndarray-imshow' )( require( 'apply-colormap' )( pic, { min: min, max: max, colormap: 'jet' } ) );

  //imshow( cmap( pic, { min: 0, max: 30, colormap: 'jet' } ) )
} );