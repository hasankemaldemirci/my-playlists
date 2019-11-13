import React, { useEffect, useState } from 'react';
import isAuthenticated from '../../app/auth';
import { getPlaylists } from '../../app/api';

// Styles
import './Playlists.scss';

// Components
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import Loader from '../../components/Loader/Loader';

const Playlists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      await getPlaylists().then((res) => {
        setPlaylists(res.data.items);
      });
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, []);

  return (
    <div className="playlists">
      <div className="hero">
        <div className="container">
          <h1>Playlists</h1>
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
          <div className="playlists-wrapper">
            {playlists.map((playlist) => (
              <PlaylistCard playlist={playlist} key={playlist.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
