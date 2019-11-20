import React from 'react';

// Styles
import './style.scss';

const Content = (props) => {
  const { children } = props;
  return <main className="content">{children}</main>;
};

export default Content;
