import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './style.scss';

const PlaylistCard = ({ playlist }) => (
  <Link to={`${playlist.id}/${playlist.name}/tracks`} className="playlist-card">
    <figure
      className="playlist-card__img"
      style={{ backgroundImage: `url(${playlist.images[0].url})` }}
    />
    <figcaption className="playlist-card__body">
      <span className="name">{playlist.name}</span>
      <span className="total">{playlist.tracks.total} Songs</span>
    </figcaption>
  </Link>
);

export default PlaylistCard;
