import "./styles/app.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {compose} from "./compose";
import {Control} from "./components/control";
import {Canvas} from "./components/canvas";

export default function main(container) {
  const composition = compose();

  ReactDOM.render((
    <div>
      <Control stores={composition.stores} actions={composition.actions.simulationActions} />
      <Canvas stores={composition.stores} actions={composition.actions.simulationActions} />
    </div>), container);
}