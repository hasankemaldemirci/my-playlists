import React from 'react';

// Styles
import './style.scss';

const TrackCard = ({ track }) => (
  <a href={track.uri} className="track-card" title={track.name}>
    <figure className="track-card__cover">
      <img src={track.album.images[2].url} alt={track.name} />
    </figure>
    <figcaption className="track-card__body">
      <div className="track-name">{track.name}</div>
      <div className="track-artist">{track.artists[0].name}</div>
    </figcaption>
  </a>
);

export default TrackCard;
