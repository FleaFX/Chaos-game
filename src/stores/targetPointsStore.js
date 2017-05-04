export class TargetPointsStore {
  constructor(choosePointAction) {
    this.targetPoints = choosePointAction.bufferWithCount(3);
    this.initialPoint = choosePointAction.skip(3).take(1);
  }

  getTargetPoints() {
    return this.targetPoints;
  }

  getInitialPoint() {
    return this.initialPoint;
  }
}