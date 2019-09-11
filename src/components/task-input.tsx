import * as React from "react";

import { observer } from "mobx-react";

interface ITaskInput {
  value: string;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

@observer
class TaskInput extends React.Component<ITaskInput> {
  render() {
    const { changeHandler, value } = this.props;
    return (
      <div className="flex-column task-input-container">
        <div className="app-text">
          <h3>Enter Task</h3>
        </div>
        <div>
          <div className="input-wrapper">
            <input
              className="center"
              maxLength={60}
              type="text"
              placeholder="Enter Task"
              value={value}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                changeHandler(e)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskInput;
