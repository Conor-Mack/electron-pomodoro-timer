import * as React from "react";

import { createSecureContext } from "tls";
import { observable } from "mobx";
import { observer } from "mobx-react";

interface ITimeSliderProps {
  label: string;
  minTime: number;
  maxTime: number;
  timeValue: number;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  blurValidator: () => void;
}

@observer
export default class TimeSlider extends React.Component<ITimeSliderProps> {
  @observable currentXCoord = 0;
  @observable thumbPosition = -5;

  thumbRef: React.RefObject<HTMLElement>;

  constructor(props) {
    super(props);
  }

  render() {
    const {
      label,
      minTime,
      maxTime,
      timeValue,
      changeHandler,
      blurValidator
    } = this.props;
    return (
      <div className="flex-column flex-1 center">
        <div className="app-text">
          <h3>{label}</h3>
        </div>
        <div className="input-wrapper">
          <input
            className="center"
            type="number"
            placeholder="Enter Minutes"
            value={timeValue}
            min={minTime}
            max={maxTime}
            onChange={e => changeHandler(e)}
            onBlur={() => blurValidator()}
          />
        </div>
        <div style={{ padding: "10px" }}>
          <input
            className="center"
            type="range"
            min={minTime}
            max={maxTime}
            value={timeValue}
            onChange={e => changeHandler(e)}
          />
        </div>
      </div>
    );
  }
}
