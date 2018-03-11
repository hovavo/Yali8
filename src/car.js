export default class Car {

  constructor() {
    this.art = paper.project.getItem({name: 'Car'});
    this.art.transformContent = false;
    this.force = 0;
    this.maxForce = 7;
    this.angle = 0;
    this.progress = 0;
    this.position;
  }
}