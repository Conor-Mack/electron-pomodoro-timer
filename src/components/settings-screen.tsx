import * as React from "react";

import CheckBox from "./checkbox";
import { FontButton } from "./font-button";
import { Link } from "react-router-dom";
import Modal from "./modal";
import PomodoroStore from "../stores/pomodoro-store";
import SetInput from "./set-input";
import TaskInput from "./task-input";
import TimeSlider from "./time-slider";
import { observer } from "mobx-react";

interface ISettingsScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class SettingsScreen extends React.Component<ISettingsScreenProps> {
  constructor(props) {
    super(props);
    console.log(props);
    props.pomodoroStore.loadIntermediarySettings();
  }

  checkSaveSettings() {
    const { pomodoroStore } = this.props;
    if (pomodoroStore.settingsHaveChanged) {
      pomodoroStore.checkSaveConfirmation = true;
    } else {
      this.navigateToPomodoroScreen();
    }
  }

  saveSettings() {
    const { pomodoroStore } = this.props;
    pomodoroStore.mergeSettings();
    pomodoroStore.resetAllPomodoros();
    this.navigateToPomodoroScreen();
  }

  navigateToPomodoroScreen() {
    this.closeSaveCheckModal();
    this.props.history.push("/");
  }

  closeSaveCheckModal() {
    const { pomodoroStore } = this.props;
    pomodoroStore.checkSaveConfirmation = false;
  }

  render() {
    const {
      setSettingsValue,
      validateTimings,
      intermediarySettings,
      checkSaveConfirmation
    } = this.props.pomodoroStore;
    return (
      <div className="flex-column">
        <div className="flex-1 flex-row settings-action-buttons">
          <FontButton
            icon="arrow-left"
            color="white"
            onButtonClick={() => this.checkSaveSettings()}
          />
          <FontButton
            icon="save"
            color="white"
            onButtonClick={() => this.saveSettings()}
          />
        </div>

        <div className="flex-1 border-bottom">
          <TaskInput
            value={intermediarySettings.task}
            changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("task", e.currentTarget.value)
            }
          />
        </div>

        <div className="flex-1 border-bottom">
          <SetInput
            settings={intermediarySettings}
            changeHandler={setSettingsValue}
          />
        </div>

        <div className="flex-1 border-bottom">
          <TimeSlider
            label="Work Time?"
            minTime={1}
            maxTime={60}
            timeValue={intermediarySettings.workTime}
            changeHandler={(event: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("workTime", event.currentTarget.value)
            }
            // blurValidator={() => validateTimings("workTime")}
          />
        </div>

        <div className="flex-1 border-bottom">
          <TimeSlider
            label="Break Time?"
            minTime={1}
            maxTime={60}
            timeValue={intermediarySettings.breakTime}
            changeHandler={(event: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("breakTime", event.currentTarget.value)
            }
            // blurValidator={() => validateTimings("breakTime")}
          />
        </div>
        {checkSaveConfirmation && (
          <Modal
            title="Save Settings"
            description="You have changed settings. Do you wish to save them?"
            noClickHandler={() => this.navigateToPomodoroScreen()}
            yesClickHandler={() => this.saveSettings()}
            clickAwayHandler={() => this.closeSaveCheckModal()}
          />
        )}
      </div>
    );
  }
}

export default SettingsScreen;
