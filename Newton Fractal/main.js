//canvas opstellen
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var round;
var xloop;
var dff

//scherm afvegen
function cleardraw() {
  clearInterval(xloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}



function algorithm() {
  clearInterval(xloop);
  function setFillStyle(ctx, r, g, b, a) {
    ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  var f = Complex.compile(document.getElementById("f").value, ['z']);

  var maxr = parseFloat(document.getElementById("maxr").value); // max aantal oplossingen

  var df = Complex.compile(math.simplify(math.derivative(math.parse("f(z)=" + document.getElementById("f").value), 'z')).toString(), ['z']);

  var N = function(z) {
    return z.minus(f(z).divide(df(z)))
  };

  var bottom = Math.floor(canvas.height / 2);
  var top = -bottom;
  var right = Math.floor(canvas.width / 2);
  var left = -right;

  setFillStyle(ctx, 255, 255, 255, 1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  var x = left - 10;
  xloop = setInterval(function(){

    for (var y = top - 10; y < bottom + 10; y++) {

      var xn = Complex(x / 500, y / 500);
      var xn1 = N(xn);
      var xn2 = N(xn1);
      var n = 0;
      while (Math.abs(f(xn2).real) + Math.abs(f(xn2).imag) > 0.000001 && n < maxr) {
        xn1 = xn2;
        xn2 = N(xn2);
        n++;
      }
      if (n>= maxr){
        setFillStyle(ctx, 255, 10, 10, 1 );
      }else{
        setFillStyle(ctx, 0, 0, 0, n / 30 );
      }

      ctx.fillRect(x - left, y - top, 1, 1);
    }

  if (x >= right + 10){
    clearInterval(xloop);
  }else{
    x++
  }
}, 10);


}
