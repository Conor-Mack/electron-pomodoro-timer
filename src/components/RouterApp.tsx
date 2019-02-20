import * as React from "react";

import { MemoryRouter, Route, Switch } from "react-router";

import Help from "./Help";
import Home from "./Home";

export default class RouterApp extends React.Component {
  render() {
    return (
      <MemoryRouter>
        <Switch>
          <Route path="/help" component={Help} />
          <Route path="/" component={Home} />
        </Switch>
      </MemoryRouter>
    );
  }
}
