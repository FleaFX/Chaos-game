import * as React from "react";
import * as ReactDOM from "react-dom";

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false, chosenPoints: 0 };
    this.subscriptions = [];

    this.choosePoint = this.choosePoint.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    const canv = ReactDOM.findDOMNode(this.refs.canvas);
    canv.width = 1024;
    canv.height = 1024;

    const ctx = canv.getContext('2d');

    this.subscriptions.push(this.props.stores.chaosStore.isReady().subscribe(ready => {
      this.setState({ isReady: ready });
    }));
    this.subscriptions.push(this.props.stores.simulationStore.getData().subscribe(simData => {
      this.draw(ctx, simData);
    }));
    this.subscriptions.push(this.props.actions.choosePoint.subscribe(point => {
      this.setState({ chosenPoints: this.state.chosenPoints + 1 });
      this.drawChosenPoint(ctx, point);
    }));
  }

  choosePoint(ev) {
    if (this.state.isReady) return;
    this.props.actions.choosePoint.onNext({
      x : ev.pageX - ev.target.offsetLeft,
      y : ev.pageY - ev.target.offsetTop
    });
  }

  draw(ctx, point) {
    ctx.fillStyle = "#000";
    ctx.fillRect(point.x, point.y, 1, 1);
  }

  drawChosenPoint(ctx, point) {
    const colours = [ "#FF0000", "#00FF00", "#0000FF", "#FF00FF" ];
    ctx.fillStyle = colours[this.state.chosenPoints];
    ctx.fillRect(point.x, point.y, 3, 3);
  }

  render() {
    if (!this.state) return;
    return (
      <canvas
        id="canv"
        onClick={this.choosePoint}
        ref="canvas">
        Your browser does not support the canvas element.
      </canvas>
    );
  }
}