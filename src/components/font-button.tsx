import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { observer } from "mobx-react";

interface IFontButtonProps {
  icon: string; //Add icon of use to library.add in app.tsx to activate icon name by string
  color?: string;
  onButtonClick: (buttonState?: boolean) => void;
  style?: {};
}

interface IVariableFontButtonProps {
  color?: string;
  toggleValue: boolean;
  icons: { isTrue: string; isFalse: string };
  onButtonClick: (buttonState?: boolean) => void;
  style?: {};
}

@observer
export class FontButton extends React.Component<IFontButtonProps> {
  render() {
    const { color, icon, onButtonClick, style } = this.props;

    return (
      <div className="font-button-container" onClick={() => onButtonClick()}>
        <svg className="font-button-svg">
          <circle r="25" cx="50%" cy="50%" fill={"green"} />
        </svg>
        <FontAwesomeIcon
          icon={icon}
          color={color}
          style={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: "20px",
            marginTop: "-10px",
            marginLeft: "-10px"
          }}
        />
      </div>
    );
  }
}

@observer
export class VariableFontButton extends React.Component<
  IVariableFontButtonProps
> {
  render() {
    const { toggleValue, color, icons, onButtonClick } = this.props;

    const iconRef = toggleValue ? icons.isTrue : icons.isFalse;

    return (
      <React.Fragment>
        <FontButton
          icon={iconRef}
          color={color}
          onButtonClick={() => onButtonClick()}
        />
      </React.Fragment>
    );
  }
}
