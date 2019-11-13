import React, { useEffect, useState } from 'react';
import { getPlaylistTracks } from '../../app/api';

// Styles
import './Tracks.scss';

// Components
import Loader from '../../components/Loader/Loader';
import TrackCard from '../../components/TrackCard/TrackCard';

const Tracks = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState([]);

  const { match } = props;
  const playlistId = match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await getPlaylistTracks(playlistId).then((res) => {
          setTracks(res.data.items);
        });
      } catch (err) {
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
  }, [playlistId]);

  return (
    <div className="tracks">
      <div className="hero">
        <div className="container">
          <h1>{match.params.name}</h1>
        </div>
      </div>
      <div className="container">
        {error && (
          <div>
            Error:
            {error.message}
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="tracks-wrapper">
            {tracks.map(({ track }) => (
              <TrackCard track={track} key={track.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracks;
