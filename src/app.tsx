import * as React from "react";

import { action, observable } from "mobx";

import { observer } from "mobx-react";

class TestStore {
  @observable counter: number = 1;

  @action
  increment() {
    this.counter++;
  }
}

const store = new TestStore();

@observer
export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <h2>Welcome to React with Typescript! {store.counter}</h2>
        <button onClick={() => store.increment()}>hello</button>
      </div>
    );
  }
}