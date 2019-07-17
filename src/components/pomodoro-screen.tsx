import * as React from "react";

import { FontButton, VariableFontButton } from "./font-button";
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

  stopTimer() {
    const { pomodoroStore } = this.props;
    pomodoroStore.stopTimer();
  }

  playPauseTimer() {
    const { pomodoroStore } = this.props;
    pomodoroStore.timerIsPaused
      ? pomodoroStore.playTimer()
      : pomodoroStore.pauseTimer();
  }

  navigateToSettings() {
    this.props.history.push("/settings");
  }

  render() {
    let {
      getDashValue,
      getReadableTime
    } = this.props.pomodoroStore.activeTimer;

    let { testClickBool, timerIsPaused } = this.props.pomodoroStore;

    const { progressCircle, timerLabel } = this.props.pomodoroStore;

    if (!!progressCircle.current) {
      progressCircle.current.style.setProperty(
        "stroke-dashoffset",
        getDashValue
      );
    }

    return (
      <div className="pomodoro-screen-container">
        <div className="flex-1 settings-panel">
          <FontButton
            icon="cog"
            color="white"
            onButtonClick={() => this.navigateToSettings()}
          />
        </div>
        <div className="flex-1 center">Task name goes here</div>
        <div className="flex-1">
          <svg className="pomodoro-svg">
            <circle
              className="backing-circle"
              cx="175"
              cy="175"
              r="120"
              fill="none"
            />
            <circle
              ref={progressCircle}
              className="progress-circle"
              cx="175"
              cy="175"
              r="120"
              fill="none"
            />
            <text ref={timerLabel} className="time-label" x="105" y="160">
              {getReadableTime}
            </text>
          </svg>
        </div>
        <div className="flex-1 center">4 of 5 Sets Complete</div>
        <div className="flex-1 action-button-panel">
          <VariableFontButton
            icons={{ isTrue: "play", isFalse: "pause" }}
            toggleValue={timerIsPaused}
            onButtonClick={() => this.playPauseTimer()}
            color="red"
          />
          <FontButton
            icon="stop"
            onButtonClick={() => this.stopTimer()}
            color="red"
          />
          <FontButton
            icon="sync"
            onButtonClick={() => console.log("HI")}
            color="red"
          />
        </div>
        {/* <button onClick={() => this.testClick()}>Hi testing</button> */}
      </div>
    );
  }
}

export default PomodoroScreen;
