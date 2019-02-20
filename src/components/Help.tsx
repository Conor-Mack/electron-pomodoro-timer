import * as React from "react";

import { Link } from "react-router-dom";

export default class Help extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        I am help
        <Link to="/">Back Home</Link>
      </div>
    );
  }
}
