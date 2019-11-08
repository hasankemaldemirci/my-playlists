import React from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";

// Styles
import "./LoginButton.scss";

// Images
import SpotifyLogo from "../../img/spotify-icon.png";

const LoginButton = () => {
  return (
    <a
      className="login-button"
      href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`}
    >
      <img src={SpotifyLogo} alt="Login to Spotify" className="login-button__icon" />
      Login to Spotify
    </a>
  );
};

export default LoginButton;
