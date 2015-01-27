(function ( root, factory ) {
  if ( typeof exports === 'object' ) {
    module.exports = factory();
  }
  else if ( typeof define === 'function' && define.amd ) {
    define( [], factory );
  }
  else {
    root.returnExports = factory();
  }
}( this, function () {

  var ndarr = require( 'ndarray' );
  var ops = require( 'ndarray-ops' );
  var show = require( 'ndarray-show' );
  var proj4 = require( 'proj4' );
  var cwise = require( 'cwise' );

  var allima_ndarray = require( './allimaavenue.ndarray.js' );
  var allima_interp = require( './allimaavenue.interp.js' );

  //const GDA94 = 'PROJCS["GDA94 / Vicgrid94",GEOGCS["GDA94",DATUM["Geocentric_Datum_of_Australia_1994",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6283"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4283"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",-36],PARAMETER["standard_parallel_2",-38],PARAMETER["latitude_of_origin",-37],PARAMETER["central_meridian",145],PARAMETER["false_easting",2500000],PARAMETER["false_northing",2500000],AUTHORITY["EPSG","3111"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]'

  const GDA94 = '+proj=lcc ' +
                '+lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145 ' +
                '+x_0=2500000 +y_0=2500000 +ellps=GRS80 ' +
                '+towgs84=0,0,0,0,0,0,0 +units=m +no_defs';

  var proj = proj4( GDA94 );

  return function ( nd, x1, y1, x2, y2, transform ) {

    var output = ndarr( new Float32Array( x2.shape[0] * y2.shape[0] ), [ x2.shape[0], y2.shape[0] ] );

    var x_max = ops.sup( x1 ); //x1.get( ops.argmax( x1 ) );
    var x_min = ops.inf( x1 ); //x1.get( ops.argmin( x1 ) );

    var y_max = ops.sup( y1 ); //y1.get( ops.argmax( y1 ) );
    var y_min = ops.inf( y1 ); //y1.get( ops.argmin( y1 ) );

    for ( var i = 0; i < x2.shape[0]; i++ ) {
      for ( var j = 0; j < y2.shape[0]; j++ ) {
        var point = transform ? transform( [ y2.get( j ), x2.get( i ) ] ) : proj.inverse( [ y2.get( j ), x2.get( i ) ] );
        if ( point[1] <= x_max && point[1] >= x_min &&
             point[0] <= y_max && point[0] >= y_min ) {
          var val = allima_interp( nd, [
            { idx: x1, pnt: point[1] },
            { idx: y1, pnt: point[0] }
          ] );
          output.set( i, j, val );
        } else {
          output.set( i, j, -32767 );
        }
      }
    }

    return output;
  }

} ));