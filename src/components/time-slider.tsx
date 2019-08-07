import * as React from "react";

import { observer } from "mobx-react";

interface ITimeSliderProps {
  label: string;
  minTime: number;
  maxTime: number;
  timeValue: number;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

@observer
export default class TimeSlider extends React.Component<ITimeSliderProps> {
  render() {
    const { label, minTime, maxTime, timeValue, changeHandler } = this.props;
    return (
      <div className="flex-column timer-slider-container">
        <div>
          <span>{label}</span>
        </div>
        <div>
          <input
            className="time-text-input"
            type="number"
            value={timeValue}
            min={minTime}
            max={maxTime}
            onChange={e => changeHandler(e)}
          />
        </div>
        <div>
          <input
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
