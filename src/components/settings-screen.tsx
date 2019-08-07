import * as React from "react";

import { Link } from "react-router-dom";
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
  render() {
    const { setSettingsValue, settings } = this.props.pomodoroStore;
    return (
      <div className="flex-column">
        <div style={{ flex: "1 1 50px" }}>
          <Link to="/">Back to Pomodoro Screen</Link>
        </div>

        <div className="flex-1">
          <TaskInput
            value={settings.task}
            changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("task", e.currentTarget.value)
            }
          />
        </div>

        <div className="flex-1">
          <SetInput
            setsHaveLimit={settings.setsHaveLimit}
            maxSets={settings.maxSets}
            changeHandler={setSettingsValue}
          />
        </div>

        <div className="flex-1">
          <TimeSlider
            label="Work Time?"
            minTime={1}
            maxTime={100}
            timeValue={settings.workTime}
            changeHandler={(event: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("workTime", event.currentTarget.value)
            }
          />
        </div>

        <div className="flex-1">
          <TimeSlider
            label="Break Time?"
            minTime={1}
            maxTime={100}
            timeValue={settings.breakTime}
            changeHandler={(event: React.FormEvent<HTMLInputElement>) =>
              setSettingsValue("breakTime", event.currentTarget.value)
            }
          />
        </div>
      </div>
    );
  }
}

export default SettingsScreen;
