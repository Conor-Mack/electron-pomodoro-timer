import * as React from "react";

import TimerStore, { TimeInteval } from "../stores/timer-store";

import { Link } from "react-router-dom";
import PomodoroStore from "../stores/pomodoro-store";
import { observer } from "mobx-react";

interface IPomodoroScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class PomodoroScreen extends React.Component<IPomodoroScreenProps> {
  timerStore: TimerStore;

  progressCircle: React.RefObject<SVGElement>;

  constructor(props) {
    super(props);
    this.progressCircle = React.createRef<SVGElement>();
    const timeInterval: TimeInteval = { hours: 0, minutes: 0, seconds: 15 };
    this.timerStore = new TimerStore(timeInterval);
  }

  render() {
    let { getDashValue, getReadableTime } = this.timerStore;
    let { testValue, incrementTestVal } = this.props.pomodoroStore;

    if (!!this.progressCircle.current) {
      this.progressCircle.current.style.setProperty(
        "stroke-dashoffset",
        getDashValue
      );
    }

    return (
      <div className="test">
        <Link to="/settings">Settings</Link>
        <span>{testValue}</span>
        <button onClick={() => incrementTestVal()}>Incrememt test</button>

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
          <text id="time-label" x="105" y="160">
            {getReadableTime}
          </text>
        </svg>
      </div>
    );
  }
}

export default PomodoroScreen;
