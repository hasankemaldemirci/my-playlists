import React from "react";

// Styles
import "./Content.scss";

const Content = props => {
  return (
    <main className="content">
      <div className="container">{props.children}</div>
    </main>
  );
};

export default Content;
