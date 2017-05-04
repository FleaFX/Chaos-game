import * as React from "react";

export class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions.push(this.props.stores.chaosStore.isReady().subscribe(ready => {
      this.setState({ isReady: ready });
    }));
  }

  render() {
    if (!this.state) return;

    const awaitingStart = (<span>Please click 4 points on the canvas</span>);

    return (
      <div id="contr">
        {!this.state.isReady ? awaitingStart : null}
      </div>
    );
  }
}