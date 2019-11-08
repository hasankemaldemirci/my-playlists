import React from "react";

// Styles
import "./LoginButton.scss";

// Images
import SpotifyLogo from "../../img/spotify-icon.png";

const LoginButton = () => {
  const authURL = process.env.REACT_APP_AUTH_URL;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const scopes = process.env.REACT_APP_SCOPES;

  const Link = () => {
    const appScopes = JSON.parse(scopes);
    const url = `${authURL}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${appScopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;

    return (
      <a href={url} className="login-button">
        <img
          src={SpotifyLogo}
          alt="Login to Spotify"
          className="login-button__icon"
        />
        Login to Spotify
      </a>
    );
  };

  return <Link />;
};

export default LoginButton;
