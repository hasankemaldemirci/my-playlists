import React from 'react';

// Styles
import './style.scss';

const Avatar = ({ name }) => (
  <figure className="user__avatar">{name.charAt(0).toUpperCase()}</figure>
);

export default Avatar;
