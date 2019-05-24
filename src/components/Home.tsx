import * as React from "react";

import { action, observable } from "mobx";

import { Link } from "react-router-dom";
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
export default class Home extends React.Component<undefined, undefined> {
  render() {
    return (
      <div className="test">
        <svg>
          <circle
            cx="150"
            cy="150"
            r="90"
            fill="none"
            stroke-dasharray="565"
            stroke-dashoffset="0"
          />
          <circle
            id="progress-circle"
            class="prog-circ"
            cx="150"
            cy="150"
            r="90"
            fill="none"
          />
          <text id="time-label" x="105" y="160" class="small" />
        </svg>
      </div>
    );
  }
}
