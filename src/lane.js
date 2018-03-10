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
  constructor(path) {
    this.path = path;
  }

  getPoint(position) {
    let svgPoint = this.path.getPointAtLength(position);
    let nextSvgPoint = this.path.getPointAtLength(position + 3);
    let angle = Math.atan2(nextSvgPoint.y - svgPoint.y, nextSvgPoint.x - svgPoint.x) * 180 / Math.PI + 90;
    return new LanePoint(svgPoint.x, svgPoint.y, angle);
  }
}