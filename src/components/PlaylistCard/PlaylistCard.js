import React from "react";

// Styles
import "./PlaylistCard.scss";

const PlaylistCard = ({ playlist }) => {
  return <div className="playlist-card">{playlist.name}</div>;
};

export default PlaylistCard;
