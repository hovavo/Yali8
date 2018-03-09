var track = 'M222.5,205.7c17.2-12.4,28-31.6,29.8-52.7s-5.9-41.8-20.9-56.8c-13.6-13.6-31.7-21.1-51-21.1\n' +
  '\ts-37.4,7.5-51,21.1c-15,15-22.6,35.7-20.9,56.8s12.6,40.3,29.8,52.7l138.2,99.5c39.2,28.2,63.9,72,67.8,120.2\n' +
  '\tc3.9,48.2-13.5,95.4-47.6,129.5C264.6,587,222.5,603,180.4,603s-84.2-16-116.3-48.1c-34.2-34.2-51.5-81.4-47.6-129.5\n' +
  '\tc3.9-48.2,28.6-92,67.8-120.2L222.5,205.7z';
var trackProperties;
var currentProgress = 0;
var length;

function init() {
  trackProperties = spp.svgPathProperties(track);
  length = trackProperties.getTotalLength();
  update();
  // console.log($('.car').position())
}

function positionCar(progress) {
  var point = trackProperties.getPropertiesAtLength(progress);
  $('.car').css({
    left: point.x,
    top: point.y,
    transform: 'rotate(' + point.tangentX + 'rad)'
  });
}

function update() {
  currentProgress += 10;
  if (currentProgress > length)
    currentProgress = currentProgress % length;
  positionCar(currentProgress);
  window.requestAnimationFrame(update);
}
