import React from "react";

// Styles
import "./Content.scss";

const Content = props => {
  return <main className="content">{props.children}</main>;
};

export default Content;
