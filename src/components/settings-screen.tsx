import * as React from "react";

import { Link } from "react-router-dom";
import PomodoroStore from "../stores/pomodoro-store";
import { observer } from "mobx-react";

interface ISettingsScreenProps {
  pomodoroStore: PomodoroStore;
}

@observer
class SettingsScreen extends React.Component<ISettingsScreenProps> {
  render() {
    return (
      <div>
        <span>Settings</span>
      </div>
    );
  }
}

export default SettingsScreen;
