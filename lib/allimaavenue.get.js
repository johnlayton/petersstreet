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

  return function ( nd, idx ) {
    var body = "return nd" + ".get( " + idx.join( ',' ) + " )" + ";";
    var func = new Function("nd", "idx", body);
    return func( nd, idx );
  }

} ));