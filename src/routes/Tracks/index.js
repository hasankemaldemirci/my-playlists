import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getPlaylistTracks } from '../../app/api';

// Styles
import './style.scss';

// Components
import Loader from '../../components/Loader';
import TrackCard from '../../components/TrackCard';

const Tracks = props => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState({});

  // Get playlist id from query
  const { match } = props;
  const playlistId = match.params.id;

  // Log out
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  }, [dispatch]);

  // Fetch Playlist Item Data
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      await getPlaylistTracks(playlistId).then(res => {
        setPlaylist(res.data);
        setTracks(res.data.tracks.items);
      });
    } catch (err) {
      if (err.response.status === 401) {
        logout();
      }
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [logout, playlistId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="tracks">
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
            <div className="tracks__sidebar">
              <div className="playlist-detail">
                {playlist.images && (
                  <figure className="playlist-detail__img">
                    <img src={playlist.images[1].url} alt={playlist.name} />
                  </figure>
                )}
                <figcaption className="playlist-detail__body">
                  <h1>{playlist.name}</h1>
                  {playlist.tracks && <div className="count">{playlist.tracks.total} Songs</div>}
                </figcaption>
              </div>
            </div>
            <div className="tracks__list">
              {tracks.map(({ track }) => (
                <TrackCard track={track} key={track.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracks;
