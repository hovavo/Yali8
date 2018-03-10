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
    this.length = path.getTotalLength();
  }

  getPoint(position) {
    let adjustedPosition = (position + this.length - this.pathOffset) % this.length;
    let svgPoint = this.path.getPointAtLength(adjustedPosition);
    let nextSvgPoint = this.path.getPointAtLength(adjustedPosition + 3);
    let angle = Math.atan2(nextSvgPoint.y - svgPoint.y, nextSvgPoint.x - svgPoint.x) * 180 / Math.PI + 90;
    return new LanePoint(svgPoint.x, svgPoint.y, angle);
  }
}