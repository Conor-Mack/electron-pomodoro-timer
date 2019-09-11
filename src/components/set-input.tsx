import * as React from "react";

import CheckBox from "./checkbox";
import { observer } from "mobx-react";

interface ISetInputProps {
  settings: any;
  changeHandler: (key: string, value: number | string | boolean) => void;
}

@observer
class SetInput extends React.Component<ISetInputProps> {
  render() {
    const { settings, changeHandler } = this.props;

    let setInputStyles = settings.setsHaveLimit
      ? { display: "flex" }
      : { display: "none" };

    return (
      <div style={{ padding: "20px 0px" }} className="flex-column">
        <div className="flex-1 center app-text">
          <h3>Will pomodoro sets have a limit?</h3>
        </div>
        <div className=" flex-1 flex-column center">
          <div style={setInputStyles} className="input-wrapper">
            <input
              className="center"
              type="number"
              placeholder="Enter Sets"
              value={settings.maxSets}
              onChange={e => changeHandler("maxSets", e.currentTarget.value)}
            />
          </div>
          <div style={{ width: "200px" }} className="flex-row flex-1">
            <CheckBox
              label="Yes"
              isChecked={settings.setsHaveLimit}
              onCheck={() => changeHandler("setsHaveLimit", true)}
            />

            <CheckBox
              label="No"
              isChecked={!settings.setsHaveLimit}
              onCheck={() => changeHandler("setsHaveLimit", false)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SetInput;
