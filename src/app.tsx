import * as React from "react";

import { MemoryRouter, Route, Switch } from "react-router";

import PomodoroScreen from "./components/pomodoro-screen";
import PomodoroStore from "./stores/pomodoro-store";
import SettingsScreen from "./components/settings-screen";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class App extends React.Component<undefined, undefined> {
  @observable pomodoroStore: PomodoroStore;

  constructor(props) {
    super(props);
    this.pomodoroStore = new PomodoroStore();
  }

  render() {
    return (
      <div>
        <MemoryRouter>
          <Switch>
            <Route
              path="/settings"
              render={props => (
                <SettingsScreen {...props} pomodoroStore={this.pomodoroStore} />
              )}
            />
            <Route
              path="/"
              render={props => (
                <PomodoroScreen {...props} pomodoroStore={this.pomodoroStore} />
              )}
              something="Im something else"
            />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}
