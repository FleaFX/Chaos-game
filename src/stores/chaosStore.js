import * as Rx from "rx";

export class ChaosStore {
  constructor(targetPoints, initialPoint) {
    this.ready = targetPoints.combineLatest(initialPoint, (target, initial) => target && initial).startWith(false);
  }

  isReady() {
    return this.ready;
  }
}