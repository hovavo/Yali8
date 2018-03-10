import Car from "./car";
import Lane, {LanePoint} from "./lane";

export default class Race {
  constructor() {
    this.racing = false;
    this.totalRounds = 3; // Move to config
    this.car = new Car();
    this.lanes = [
      new Lane(SVG.get('Track_3').node, 434.695),
      new Lane(SVG.get('Track_2').node, 107.145),
      new Lane(SVG.get('Track_1').node, 949.02)
    ];
    this.placeholderBelow = SVG.get('Placeholder_below');
    this.placeholderAbove = SVG.get('Placeholder_above');

    this.init();
    this.update();
  }

  init() {
    this.elapsedTime = new Date(0);
    this.currentRound = 0;
    this.elapsedTime = 0;
    this.currentRound = 0;
    this.currentLaneIndex = 1;
    this.currentLane = this.lanes[this.currentLaneIndex];
    this.car.force = 0;
    this.car.progress = 0;
    this.car.position = this.currentLane.getPoint(0);
    this.carIsAbove = true;
    this.car.art.addTo(this.placeholderAbove);
  }

  start() {
    this.init();
    this.staredTime = new Date().getTime();
    window.requestAnimationFrame(this.update.bind(this));
    this.racing = true;
  }

  stop() {
    this.racing = false;
  }


  /**
   * @param direction {Number} 1 = right, -1 = left
   */
  switchLane(direction) {
    if (direction === 1) {
      if (this.currentLaneIndex !== 2) {
        this.currentLaneIndex++;
        this.currentLane = this.lanes[this.currentLaneIndex];
      }
    }
    else if (direction === -1) {
      if (this.currentLaneIndex !== 0) {
        this.currentLaneIndex--;
        this.currentLane = this.lanes[this.currentLaneIndex];
      }
    }
  }

  update() {
    this.updateTime();
    this.updateCar();

    if (this.racing) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }

  updateTime() {
    this.elapsedTime = new Date(new Date().getTime() - this.staredTime);
  }

  updateCar() {
    if (this.car.force < this.car.maxForce) {
      this.car.force += 0.05;
    }

    this.car.progress += this.car.force;
    if (this.car.progress > this.currentLane.length) {
      this.car.progress = this.car.progress % this.currentLane.length;
      this.currentRound++;
    }

    let nextPoint = this.currentLane.getPoint(this.car.progress);

    this.car.position = nextPoint;
    this.car.artInner.rotate(nextPoint.angle);
    this.car.art.x(nextPoint.x);
    this.car.art.y(nextPoint.y);

    if (this.car.progress > 900 && this.car.progress < 1300) {
      if (this.carIsAbove) {
        this.carIsAbove = false;
        this.car.art.addTo(this.placeholderBelow);
      }
    }
    else if (!this.carIsAbove) {
      this.carIsAbove = true;
      this.car.art.addTo(this.placeholderAbove);
    }
  }
}