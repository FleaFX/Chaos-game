import * as Rx from "rx";

export class DiceStore {
  constructor() {
    this.rolls = Rx.Observable
      .interval(1)
      .map(_ => Number(((Math.random() * 10) % 6).toFixed()) + 1)
      .share();
  }

  roll() {
    return this.rolls;
  }
}