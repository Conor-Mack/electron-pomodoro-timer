import * as React from "react";

interface ICheckBox {
  isChecked: boolean;
  onCheck: () => void;
  label: string;
}

class CheckBox extends React.Component<ICheckBox> {
  render() {
    const { isChecked, onCheck, label } = this.props;
    let styles = isChecked
      ? {
          fillOpacity: 1,
          fill: "#fb6209"
        }
      : {
          fillOpacity: 0
        };

    return (
      <div className="flex-row flex-1">
        <svg className="svg-checkbox-container" onClick={() => onCheck()}>
          <circle
            className="svg-checkbox"
            cx="20"
            cy="20"
            r="12"
            stroke={isChecked ? "#fb6209" : "grey"}
            strokeWidth={4}
            fillOpacity={0}
          />
          <circle
            className="svg-checkbox"
            cx="20"
            cy="20"
            r="6"
            fill="grey"
            {...styles}
          />
        </svg>
        <h4 className="app-text">{label}</h4>
      </div>
    );
  }
}

export default CheckBox;
