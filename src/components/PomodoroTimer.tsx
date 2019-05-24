import * as React from "react";

import { Link } from "react-router-dom";
import TimerStore from "../stores/timer-store";
import { action } from "mobx";
import { observer } from "mobx-react";

@observer
export default class PomodoroTimer extends React.Component<
  undefined,
  undefined
> {
  TimerStore: TimerStore;

  constructor(props) {
    super(props);
    this.progressCircle = React.createRef();
  }

  componentDidMount() {
    let radius: number = Number(this.progressCircle.current.getAttribute("r"));
    let circumference: number = 2 * Math.PI * radius;
    this.TimerStore = new TimerStore({ radius, circumference });
  }

  render() {
    return (
      <div className="test">
        <svg>
          <circle cx="150" cy="150" r="90" fill="none" />
          <circle
            ref={this.progressCircle}
            id="progress-circle"
            cx="150"
            cy="150"
            r="90"
            fill="none"
          />
          <text id="time-label" x="105" y="160" />
        </svg>
      </div>
    );
  }
}
