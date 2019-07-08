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
      <div className="test">
        <svg className="pomodoro-svg">
          <circle
            className="backing-circle"
            cx="150"
            cy="150"
            r="90"
            fill="none"
          />
          <circle
            ref={progressCircle}
            className="progress-circle"
            cx="150"
            cy="150"
            r="90"
            fill="none"
          />
          <text ref={timerLabel} className="time-label" x="105" y="160">
            {getReadableTime}
          </text>
        </svg>
        <div className="action-button-panel">
          <div>
            <VariableFontButton
              icons={{ isTrue: "pause", isFalse: "play" }}
              toggleValue={timerIsPaused}
              onButtonClick={() => this.playPauseTimer()}
            />
          </div>
          <div>
            <FontButton icon="stop" onButtonClick={() => this.stopTimer()} />
          </div>
        </div>
        {/* <button onClick={() => this.testClick()}>Hi testing</button> */}
      </div>
    );
  }
}

export default PomodoroScreen;
