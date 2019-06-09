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
    const uiState = { circleRef: this.progressCircle };
    this.timerStore = new TimerStore(timeInterval, uiState);
  }

  componentDidMount() {
    const { pomodoroStore } = this.props;
    pomodoroStore.managePomodoro(this.progressCircle);
  }

  render() {
    let {
      getDashValue,
      getReadableTime
    } = this.props.pomodoroStore.activeTimer;
    console.log(getDashValue, getReadableTime);

    if (!!this.progressCircle.current) {
      this.progressCircle.current.style.setProperty(
        "stroke-dashoffset",
        getDashValue
      );
    }

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
          <text id="time-label" x="105" y="160">
            {getReadableTime}
          </text>
        </svg>
      </div>
    );
  }
}

export default PomodoroScreen;
