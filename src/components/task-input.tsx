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
        <div>
          <span>Enter Task</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Task"
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              changeHandler(e)
            }
          />
        </div>
      </div>
    );
  }
}

export default TaskInput;
