import React from 'react';

// Config
import config from '../../app/config';

// Styles
import './style.scss';

// Images
import SpotifyIcon from '../../img/spotify-icon.png';

const LoginButton = () => {
  const authURL = config.AUTH_URL;
  const clientId = config.CLIENT_ID;
  const redirectUri = config.REDIRECT_URI;
  const scopes = config.SCOPES;

  const Button = () => {
    const appScopes = scopes.join('&');
    const url = `${authURL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${appScopes}&response_type=token`;

    return (
      <a href={url} className="login-button">
        <img src={SpotifyIcon} alt="Login to Spotify" className="login-button__icon" />
        Login to Spotify
      </a>
    );
  };

  return <Button />;
};

export default LoginButton;
