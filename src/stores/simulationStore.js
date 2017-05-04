import * as Rx from "rx"

function halve(curr, target) {
  if (curr > target) return curr - ((curr - target) / 2);
  return curr + ((target - curr) / 2);
}

export class SimulationStore {
  constructor(targetPoints, initialPoint, diceRolls) {
    this.simulationData = targetPoints
      .combineLatest(initialPoint, (target, initial) => { return { target: target, initial: initial }; })
      .flatMap(points => {
        var target = points.target;
        return diceRolls.scan((last, roll) => {
          return (
            // we rolled a 1 or a 2: approach point A
            roll <= 2 ? { x: halve(last.x, target[0].x), y: halve(last.y, target[0].y) } :

            // we rolled a 3 or a 4: approach point B
            roll > 2 && roll <= 4 ? { x: halve(last.x, target[1].x), y: halve(last.y, target[1].y) } :

            // we rolled a 5 or a 6: approach point C
            { x: halve(last.x, target[2].x), y: halve(last.y, target[2].y) }
          );
        }, points.initial);
      });
  }

  getData() {
    return this.simulationData;
  }
}