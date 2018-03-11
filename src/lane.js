export class LanePoint {
  constructor(x, y, angle, force, isBump, isPowerup) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.force = force;
    this.isBump = isBump;
    this.isPowerup= isPowerup;
  }
}

export default class Lane {

  /**
   *
   * @param path {SVGPathElement}
   *
   * */
  constructor(path, offset = 0) {
    this.path = path;
    this.pathOffset = offset;
    this.length = path.length;
  }

  getPoint(progress) {
    let adjustedProgress = this.adjustProgress(progress);
    let svgPoint = this.path.getPointAt(adjustedProgress);
    let angle = this.path.getNormalAt(adjustedProgress).angle + 180;
    return new LanePoint(svgPoint.x, svgPoint.y, angle);
  }

  adjustProgress(progress) {
    return (progress + this.length - this.pathOffset) % this.length;
  }

  reverseAdjustProgress(progress) {
    return (progress + this.pathOffset) % this.length;
  }


}