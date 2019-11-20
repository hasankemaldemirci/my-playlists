import React, { useEffect, useState, useCallback } from 'react';
import isAuthenticated from '../../app/auth';
import { getPlaylists } from '../../app/api';

// Styles
import './style.scss';

// Components
import PlaylistCard from '../../components/PlaylistCard';
import Loader from '../../components/Loader';

const Playlists = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  // Fetch Playlists Data
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      await getPlaylists().then(res => {
        setPlaylists(res.data.items);
      });
    } catch (err) {
      if (err.response.status !== 401) {
        setError(err);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [fetchData]);

  const TotalPlaylistCount = () =>
    playlists.length ? <h2>Total Playlists Count: {playlists.length}</h2> : null;

  return (
    <div className="playlists">
      <div className="hero">
        <div className="container">
          <h1>Playlists</h1>
          <TotalPlaylistCount />
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
            {playlists.map(playlist => (
              <PlaylistCard playlist={playlist} key={playlist.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
