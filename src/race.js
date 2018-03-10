import Car from "./car";
import Lane from "./lane";

export default class Race {
  constructor() {
    this.elapsedTime = new Date(0);
    this.currentRound = 0;
    this.totalRounds = 3; // Move to config
    this.car = new Car();
    this.lanes = [
      new Lane()
    ];

    this.currentLane = this.lanes[0];

    this.racing = false;
  }

  start() {
    this.elapsedTime = 0;
    this.currentRound = 0;
    this.staredTime = new Date().getTime();
    window.requestAnimationFrame(this.update.bind(this));
    this.racing = true;
  }

  stop() {
    this.racing = false;
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
    // if (this.car.force < this.car.maxForce) {
    //   this.car.force += 0.001;
    // }

    // this.car.force = 0.001;
    // this.car.progress += this.car.force;
    //
    // let nextPoint = this.currentLane.getPoint(this.car.progress);
    //
    // this.car.position = nextPoint;

  }
}