import * as simulationActions from "./actions/simulationActions";

import {ChaosStore} from "./stores/chaosStore";
import {DiceStore} from "./stores/diceStore";
import {SimulationStore} from "./stores/simulationStore";
import {TargetPointsStore} from "./stores/targetPointsStore";

export function compose() {
  const targetPointsStore = new TargetPointsStore(simulationActions.default.choosePoint);
  const chaosStore = new ChaosStore(targetPointsStore.getTargetPoints(), targetPointsStore.getInitialPoint());
  const diceStore = new DiceStore();
  const simulationStore = new SimulationStore(targetPointsStore.getTargetPoints(), targetPointsStore.getInitialPoint(), diceStore.roll());

  return {
    actions: {
      simulationActions: simulationActions.default
    },
    stores: {
      chaosStore: chaosStore,
      simulationStore: simulationStore
    }
  };
}