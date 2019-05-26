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
    let { testValue, incrementTestVal } = this.props.pomodoroStore;
    return (
      <div>
        <span>{testValue}</span>
        <button onClick={() => incrementTestVal()}>Incrememt test</button>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default SettingsScreen;
