import * as React from "react";

import { observer } from "mobx-react";

interface ITimeSliderProps {
  label: string;
  minTime: number;
  maxTime: number;
  timeValue: number;
}

@observer
export default class TimeSlider extends React.Component<ITimeSliderProps> {
  render() {
    const { label, minTime, maxTime, timeValue } = this.props;
    return (
      <div>
        <span>{label}</span>
        <input type="range" min={minTime} max={maxTime} value={timeValue} />
      </div>
    );
  }
}
