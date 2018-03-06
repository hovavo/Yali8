var canvas = Snap('#canvas');
var mainGroup = canvas.group();
var art;

Snap.load('/img/8.svg', function (svg) {
  art = svg;
  mainGroup.add(art);
  var bounds = mainGroup.getBBox();
  canvas.attr({height: bounds.height})
});