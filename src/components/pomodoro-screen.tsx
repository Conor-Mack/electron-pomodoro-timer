import * as React from "react";

import TimerStore, { TimeInteval } from "../stores/timer-store";

import PomodoroStore from "../stores/pomodoro-store";
import { observer } from "mobx-react";

interface IPomodoroScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class PomodoroScreen extends React.Component<IPomodoroScreenProps> {
  constructor(props) {
    super(props);
    props.pomodoroStore.storeTimerRef(
      React.createRef<SVGElement>(),
      React.createRef<SVGElement>()
    );
  }

  componentDidMount() {
    const { pomodoroStore } = this.props;
    pomodoroStore.managePomodoro();
  }

  testClick() {
    const { pomodoroStore } = this.props;
    pomodoroStore.testClick();
  }

  render() {
    let {
      getDashValue,
      getReadableTime
    } = this.props.pomodoroStore.activeTimer;

    let { testClickBool } = this.props.pomodoroStore;

    const { progressCircle, timerLabel } = this.props.pomodoroStore;

    console.log("testClickBool", testClickBool);

    if (!!progressCircle.current) {
      progressCircle.current.style.setProperty(
        "stroke-dashoffset",
        getDashValue
      );
    }

    return (
      <div className="test">
        <svg>
          <circle cx="150" cy="150" r="90" fill="none" />
          <circle
            ref={progressCircle}
            id="progress-circle"
            cx="150"
            cy="150"
            r="90"
            fill="none"
          />
          <text ref={timerLabel} id="time-label" x="105" y="160">
            {getReadableTime}
          </text>
        </svg>

        <button onClick={() => this.testClick()}>Hi testing</button>
      </div>
    );
  }
}

export default PomodoroScreen;
