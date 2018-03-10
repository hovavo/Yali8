export class LanePoint {
  constructor(x, y, normal, force, isBump, isPowerup) {
    this.x = x;
    this.y = y;
    this.normal = normal;
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
    let svgPoint = path.getPointAtLength(position);
    // let nextSvgPoint = path.getPointAtLength(position + 3);
    return new LanePoint(svgPoint.x, svgPoint.y);
  }
}