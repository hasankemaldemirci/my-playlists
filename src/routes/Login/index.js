import React from 'react';

// Styles
import './style.scss';

// Components
import LoginButton from '../../components/LoginButton';

// Images
import Logo from '../../img/logo.png';

const Login = () => (
  <div className="login">
    <div className="container">
      <div className="login__content">
        <h1>My Playlists</h1>
        <img src={Logo} className="logo" alt="My Playlists" />
        <LoginButton />
      </div>
    </div>
  </div>
);

export default Login;
