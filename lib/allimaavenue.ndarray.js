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

  return function ( ndarray, value ) {
    for ( i = 0; i < ndarray.shape[0] - 1; i++ ) {
      if ( ( ndarray.get( i ) >= value ) != ( ndarray.get( i + 1 ) >= value ) ) {
        return [ i, i + 1 ];
      }
    }
    return [0, 1];
  }

} ));