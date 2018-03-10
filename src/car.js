export default class Car {

  constructor() {
    this.art = SVG.get("Car");
    this.artInner = SVG.get("Car_inner");
    this.force = 0;
    this.maxForce = 5;
    this.angle = 0;
    this.progress = 0;
    this.position;
  }
}