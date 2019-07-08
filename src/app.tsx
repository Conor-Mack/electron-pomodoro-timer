import * as React from "react";

import { MemoryRouter, Route, Switch } from "react-router";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

import PomodoroScreen from "./components/pomodoro-screen";
import PomodoroStore from "./stores/pomodoro-store";
import SettingsScreen from "./components/settings-screen";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { observable } from "mobx";
import { observer } from "mobx-react";

library.add(fab, faStop, faPause, faPlay);

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
            />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}
