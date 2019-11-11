import React from "react";

// Styles
import "./PlaylistCard.scss";

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="playlist-card">
      <figure
        className="playlist-card__img"
        style={{ backgroundImage: `url(${playlist.images[0].url})` }}
      ></figure>
    </div>
  );
};

export default PlaylistCard;
