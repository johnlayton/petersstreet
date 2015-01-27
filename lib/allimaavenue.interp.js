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

  var ops     = require( 'ndarray-ops' );
  var cwise   = require( 'cwise' );
  var pack    = require( 'ndarray-pack' );
  var unpack  = require( 'ndarray-unpack' );
  var ndarray = require( 'ndarray' );
  var isnd    = require( 'isndarray' );
  var show    = require( 'ndarray-show' );

  var bounds = function ( nd, value ) {
    if ( value <= ops.inf( nd ) ) {
      if ( nd.get( 0 ) < nd.get( nd.shape[0] - 1 ) ) {
        return [ 0, 1 ];
      } else {
        return [ nd.shape[0] - 2, nd.shape[0] - 1 ];
      }
    }
    else if ( value >= ops.sup( nd ) ) {
      if ( nd.get( 0 ) < nd.get( nd.shape[0] - 1 ) ) {
        return [ nd.shape[0] - 2, nd.shape[0] - 1 ];
      } else {
        return [ 0, 1 ];
      }
    }
    else {
      for ( i = 0; i < nd.shape[0] - 1; i++ ) {
        if ( ( nd.get( i ) >= value ) != ( nd.get( i + 1 ) >= value ) ) {
          return [ i, i + 1 ];
        }
      }
    }
  };

  var array = function( nd, idx ) {
    var body = "return nd" +
               ".hi( " + idx.map( function( i ) { return i[1] + 1; } ).join( ', ' ) + " )" +
               ".lo( " + idx.map( function( i ) { return i[0]; } ).join( ',' ) + " )" +
               ";";
    var func = new Function("nd", "idx", body);
    var result = func( nd, idx );
    return pack( unpack( result ) );
  };

  var sum = cwise( {
     args : ["array"],
     pre  : function () {
       this.total = 0;
     },
     body : function average( arr ) {
       this.total += arr
     },
     post : function () {
       return this.total;
     }
  } );

  var div = cwise( {
     args : ["array", "scalar"],
     body : function average( arr, factor ) {
       arr = arr / factor;
     }
   } );

  var mul = cwise( {
     args : ["array", "array"],
     body : function average( arr, factor ) {
       arr = arr * factor;
     }
   } );

  var weight = function( wghts ) {
    var size = Math.pow( 2, wghts.shape[0] );
    var shape  = [];
    for ( i = 0; i < wghts.shape[0]; i++ ) {
      shape.push( 2 );
    }
    var result = ndarray( new Float32Array( size ), shape );
    cwise( {
       args : ["array", "scalar", "index"],
       body : function average( arr, wgts, idx ) {
        var t = idx.map( function( i, j ) {
           return wgts.get( j, i );
        } );
        var x = 1;
        for ( i = 0 ; i < t.length; i++ ) {
          x = x * t[i];
        }
        arr = x;
       }
    } )( result, wghts );
    return result;
  };

  var p = function( nd ) {
    return isnd( nd ) ? nd : pack( nd );
  };

  return function ( nd, idx  ) {
    var bnds = idx.map( function( i ) {
      return bounds( p( i.idx ), i.pnt );
    } );
    var wghts = weight( p( idx.map( function( i ) {
      var bnds = bounds( p( i.idx ), i.pnt );
      if ( bnds[0] == bnds[1] ) {
        return [ 0.5, 0.5 ]
      } else {
        var arr = [
          Math.abs( ( p( i.idx ).get( bnds[1] ) - i.pnt ) / ( p( i.idx ).get( bnds[1] ) - p( i.idx ).get( bnds[0] ) ) ),
          Math.abs( ( i.pnt - p( i.idx ).get( bnds[0] ) ) / ( p( i.idx ).get( bnds[1] ) - p( i.idx ).get( bnds[0] ) ) )
        ];
        return arr;
      }
    } ) ) );
    var ndar = array( nd, bnds );
    mul( ndar, wghts );
    var res = sum( ndar );
    return res;
  }

} ));