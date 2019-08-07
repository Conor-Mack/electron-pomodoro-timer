import * as React from "react";

import { observer } from "mobx-react";

interface ISetInputProps {
  setsHaveLimit: boolean;
  maxSets?: number;
  changeHandler: (key: string, value: number | string | boolean) => void;
}

@observer
class SetInput extends React.Component<ISetInputProps> {
  render() {
    const { setsHaveLimit, maxSets, changeHandler } = this.props;
    return (
      <div className="flex-column">
        <div className="flex-1">Will pomodoro sets have a limit?</div>
        <div className=" flex-1 flex-row">
          <div className="flex-1">
            <div>
              <input
                type="radio"
                id="yes"
                name="yes"
                value="yes"
                checked={setsHaveLimit}
                onChange={() => changeHandler("setsHaveLimit", true)}
              />
              <label for="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="no"
                name="no"
                value="no"
                checked={!setsHaveLimit}
                onChange={() => changeHandler("setsHaveLimit", false)}
              />
              <label for="no">No</label>
            </div>
          </div>
          <div className="flex-1">
            {!!setsHaveLimit && (
              <input
                type="number"
                placeholder="Enter Sets"
                value={maxSets}
                onChange={e => changeHandler("maxSets", e.currentTarget.value)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SetInput;
