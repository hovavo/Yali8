var canvas = Snap('#canvas');
var mainGroup = canvas.group();
var art;
var car;
var lanes = [];
var carMatrix  = new Snap.Matrix();
var currentProgress = 0;

Snap.load('/img/8.svg', function (svg) {
  art = svg;
  mainGroup.add(art);
  var bounds = mainGroup.getBBox();
  canvas.attr({height: bounds.height});

  car = mainGroup.group();
  car.rect(-8, -15, 16, 30)
  .attr({fill: 'red'});

  lanes = [Snap('#Track_1'), Snap('#Track_2'), Snap('#Track_3')];

  update();

});

function positionCar(path, progress) {
  var point = path.getPointAtLength(progress);
  carMatrix.translate(point.x, point.y);
  carMatrix.rotate(point.alpha + 90);
  car.transform(carMatrix);
}

function update() {
  currentProgress += 0;
  if (currentProgress > 1)
    currentProgress = 0;
  positionCar(lanes[0], currentProgress);
  console.log(currentProgress)
  window.requestAnimationFrame(update);
}
