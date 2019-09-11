import * as React from "react";
import * as ReactDOM from "react-dom";

import { observer } from "mobx-react";

const modalRoot = document.getElementById("modal-root");

interface IModal {
  title: string;
  description: string;
  noClickHandler: () => void;
  yesClickHandler: () => void;
  clickAwayHandler: () => void;
}

class Modal extends React.Component<IModal> {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot!.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(<ModalContent {...this.props} />, this.el);
  }
}

@observer
class ModalContent extends React.Component<IModal> {
  overlayClick(event: React.MouseEvent<HTMLElement>) {
    if ([...event.target.classList].includes("modal-overlay")) {
      this.props.clickAwayHandler();
    }
  }

  render() {
    const { noClickHandler, yesClickHandler, title, description } = this.props;

    return (
      <div
        className="modal-overlay display-modal"
        onClick={this.overlayClick.bind(this)}
      >
        <div className="modal-container flex-column">
          <div className="modal-title flex-1">
            <h4>{title}</h4>
          </div>
          <div className="modal-body flex-1">{description}</div>
          <div className="modal-action flex-row flex-1">
            <div className="flex-row">
              <button
                onClick={e => {
                  yesClickHandler();
                }}
                type="button"
              >
                Yes
              </button>
              <button onClick={() => noClickHandler()} type="button">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
