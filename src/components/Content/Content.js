import React from "react";

// Styles
import "./Content.scss";

const Content = ({ body }) => {
  return (
    <main className="content">
      <div className="container">{body}</div>
    </main>
  );
};

export default Content;
