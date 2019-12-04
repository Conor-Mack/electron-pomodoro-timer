import * as React from "react";
import * as ReactDOM from "react-dom";

import { FontButton, VariableFontButton } from "./font-button";
import TimerStore, { TimeInteval } from "../stores/timer-store";

import Modal from "./modal";
import PomodoroStore from "../stores/pomodoro-store";
import { observer } from "mobx-react";

interface IPomodoroScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class PomodoroScreen extends React.Component<IPomodoroScreenProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { pomodoroStore } = this.props;
    pomodoroStore.managePomodoro();
  }

  componentWillUnmount() {
    const { pomodoroStore } = this.props;
  }

  stopTimer() {
    const { pomodoroStore } = this.props;
    pomodoroStore.stopTimer();
  }

  playPauseTimer() {
    const { pomodoroStore } = this.props;
    pomodoroStore.timerIsPaused
      ? pomodoroStore.managePomodoro()
      : pomodoroStore.pauseTimer();
  }

  navigateToSettings() {
    const { pomodoroStore } = this.props;
    pomodoroStore.pauseTimer();
    this.props.history.push("/settings");
  }

  toggleModal(value: boolean) {
    const { pomodoroStore } = this.props;
    pomodoroStore.pauseTimer();
    pomodoroStore.checkResetConfirmation = value;
  }

  cancelClick(value: boolean) {
    const { pomodoroStore } = this.props;
    pomodoroStore.managePomodoro();
    pomodoroStore.checkResetConfirmation = value;
  }

  render() {
    let {
      getDashValue,
      getReadableTime
    } = this.props.pomodoroStore.activeTimer;

    let {
      timerIsPaused,
      settings,
      checkResetConfirmation,
      setsCompleteText,
      isWorkTime
    } = this.props.pomodoroStore;

    const {
      progressCircle,
      timerLabel,
      workBreakLabel,
      resetAllPomodoros,
      currentSetText
    } = this.props.pomodoroStore;

    if (!!progressCircle.current) {
      progressCircle.current.style.setProperty(
        "stroke-dashoffset",
        getDashValue
      );
    }

    let workBreakText = isWorkTime ? "Work" : "Break";

    return (
      <div className="pomodoro-screen-container">
        <div className="flex-1 settings-panel">
          <FontButton
            icon="cog"
            color="white"
            onButtonClick={() => this.navigateToSettings()}
          />
        </div>
        <div className="center app-text">
          <h2>{settings.task}</h2>
        </div>
        <div className="center app-text">
          <h3 style={{ color: "#e8e84b" }}>{currentSetText}</h3>
        </div>
        <div className="flex-1">
          <svg className="pomodoro-svg">
            <circle
              className="backing-circle"
              cx="165"
              cy="165"
              r="120"
              fill="none"
            />
            <circle
              ref={progressCircle}
              className="progress-circle"
              cx="165"
              cy="165"
              r="120"
              fill="none"
            />
            <text
              ref={workBreakLabel}
              className="work-break-label"
              x="120"
              y="150"
            >
              {workBreakText}
            </text>
            <text ref={timerLabel} className="time-label" x="115" y="190">
              {getReadableTime}
            </text>
          </svg>
        </div>
        <div className="flex-1 center app-text">
          <h3>{setsCompleteText}</h3>
        </div>
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
            onButtonClick={() => this.toggleModal(true)}
            color="red"
          />
        </div>
        {checkResetConfirmation && (
          <Modal
            title="Reset Pomodoro"
            description="This will reset all completed sets and times. Do you wish to continue?"
            noClickHandler={this.cancelClick.bind(this)}
            clickAwayHandler={this.cancelClick.bind(this)}
            yesClickHandler={() => resetAllPomodoros()}
          />
        )}
      </div>
    );
  }
}

export default PomodoroScreen;
