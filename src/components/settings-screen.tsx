import * as React from "react";

import { Link } from "react-router-dom";
import PomodoroStore from "../stores/pomodoro-store";
import TimeSlider from "./time-slider";
import { observer } from "mobx-react";

interface ISettingsScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class SettingsScreen extends React.Component<ISettingsScreenProps> {
  render() {
    return (
      <div>
        <Link to="/">Back to Pomodoro Screen</Link>
        <TimeSlider
          label="Work Time?"
          minTime={1}
          maxTime={100}
          timeValue={50}
        />
      </div>
    );
  }
}

export default SettingsScreen;
