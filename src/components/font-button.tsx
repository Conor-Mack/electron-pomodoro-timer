import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { observer } from "mobx-react";

interface IFontButtonProps {
  icon: string; //Add icon of use to library.add in app.tsx so activate icon name by string
  color?: string;
  onButtonClick: (buttonState?: boolean) => void;
}

interface IVariableFontButtonProps {
  color?: string;
  toggleValue: boolean;
  icons: { isTrue: string; isFalse: string };
  onButtonClick: (buttonState?: boolean) => void;
}

@observer
export class FontButton extends React.Component<IFontButtonProps> {
  render() {
    const { color, icon, onButtonClick } = this.props;

    return (
      <div className="font-button-container">
        <svg className="font-button-svg">
          <circle
            r="25"
            cx="50%"
            cy="50%"
            fill={color || "green"}
            onClick={() => onButtonClick()}
          />
        </svg>
        <div className="font-button-icon">
          <FontAwesomeIcon icon={icon} color={color} />
        </div>
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
      <div>
        <FontButton
          icon={iconRef}
          color={color}
          onButtonClick={() => onButtonClick()}
        />
      </div>
    );
  }
}
