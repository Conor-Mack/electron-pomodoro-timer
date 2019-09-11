import * as React from "react";

import { MemoryRouter, Route, Switch } from "react-router";

import Help from "./Help";
import PomodoroScreen from "./pomodoro-screen";
import SettingsScreen from "./settings-screen";

export default class RouterApp extends React.Component {
  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/help" component={Help} />
          <Route path="/" component={PomodoroScreen} />
        </Switch>
      </MemoryRouter>
    );
  }
}
