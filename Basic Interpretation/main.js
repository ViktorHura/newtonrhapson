//canvas opstellen
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var round;

//oorsrpong
var xo = canvas.width / 2;
var yo = canvas.height / 2;

var zoomlevelx = 10;
var zoomlevely = 10;

//onze coordinaten omzetten naar canvas coordinaten
function cx(x) {
  return (x * zoomlevelx) + xo;
}

function cy(y) {
  return yo - (y * zoomlevely);
}
//canvas coordinaten naar onze coordinaten
function cax(x) {
  return (x / zoomlevelx) - (xo / zoomlevelx);
}

function cay(y) {
  return (yo / zoomlevely) - (y / zoomlevely);
}

function axis() {
  //assen tekenen
  ctx.beginPath();

  ctx.moveTo(cx(0), cy(25));
  ctx.lineTo(cx(0), cy(-25));


  ctx.moveTo(cx(-25), cy(0));
  ctx.lineTo(cx(25), cy(0));

  //as markeringen
  for (var x = -25; x < 25; x++) {
    ctx.moveTo(cx(x), cy(0.5));
    ctx.lineTo(cx(x), cy(-0.5));

    if (x == 1) {
      ctx.fillText("1", cx(1), cy(-1.5));
    }
  }
  for (var y = -25; y < 25; y++) {
    ctx.moveTo(cx(0.5), cy(y));
    ctx.lineTo(cx(-0.5), cy(y));

    if (y == 1) {
      ctx.fillText("1", cx(-1.5), cy(1));
    }
  }


  ctx.strokeStyle = "#c4c2c2";
  ctx.stroke();

}
axis();

//functie tekenen
function draw() {
  //wiskundige functie vertalen naar js functie
  var fv = document.getElementById("f").value;
  var f = math.eval(fv);
  round = parseInt(document.getElementById("round").value);
  drawf(f);


}

function drawf(f) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  axis();
  ctx.beginPath();
  for (var x = 0; x < canvas.width; x++) {

    var y = Math.round(cy(f(cax(x))));
    ctx.lineTo(x, y);
  }

  ctx.lineJoin = "round";
  ctx.lineWidth = "2";
  ctx.strokeStyle = "red";
  ctx.stroke();

}


//scherm afvegen
function cleardraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  axis();
}

function algorithm() {

  document.getElementById("results").innerHTML = '';
  draw();
  var fv = document.getElementById("f").value;
  var f = math.eval(fv); // functie
  var x0 = parseFloat(document.getElementById("x0").value); //beginwaarde
  var maxr = parseFloat(document.getElementById("maxr").value); // max aantal oplossingen

  var results = []; //verzameling van alle uitkomsten



  var df = function(v) { //afgeleide functie
    return math.derivative(math.parse(fv), 'x').eval({
      x: v
    })
  }



  for (var i = 0; i < maxr; i++) {
    var pointcouple = {
      xn: 0,
      xn1: 0
    }

    if (i == 0) {
      pointcouple.xn = x0;
    } else {
      pointcouple.xn = results[i - 1].xn1;
    }

    if (df(pointcouple.xn) == 0) {
      if (results[i - 1].xn > pointcouple.xn) {
        pointcouple.xn -= Math.pow(0.1, round);
      } else {
        pointcouple.xn += Math.pow(0.1, round);
      }
    }

    pointcouple.xn1 = pointcouple.xn - (f(pointcouple.xn) / df(pointcouple.xn));




    //resultate op het scherm noteren en tekenen
    results.push(pointcouple);
    document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + "<p><b>x" + i + ":</b> " + (results[i].xn).toFixed(round) + " <b>y" + i + ":</b> " + (f(results[i].xn)).toFixed(round) + "</p>"

    ctx.beginPath();
    ctx.lineWidth = "0.5";
    ctx.strokeStyle = "blue";
    ctx.moveTo(cx(pointcouple.xn), cy(f(pointcouple.xn)));
    ctx.lineTo(cx(pointcouple.xn1), cy(0));
    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(cx(pointcouple.xn), cy(f(pointcouple.xn)));
    ctx.lineTo(cx(pointcouple.xn), cy(0));
    ctx.stroke();
    ctx.fillText("x" + i, cx(pointcouple.xn), cy(-2));
    ctx.setLineDash([]);

  }
  console.log(results);

}