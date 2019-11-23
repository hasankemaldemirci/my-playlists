import React, { useEffect, useState, useCallback } from 'react';
import { getPlaylistTracks } from '../../app/api';

// Styles
import './style.scss';

// Components
import Loader from '../../components/Loader';
import TrackCard from '../../components/TrackCard';
import Pagination from '../../components/Pagination';

const Tracks = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [tracks, setTracks] = useState({});
  const [playlist, setPlaylist] = useState({});

  // Get playlist id from query
  const { match } = props;
  const playlistId = match.params.id;

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
    setOffset(limit * (page - 1));
  };

  // Fetch Playlist Item Data
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      await getPlaylistTracks(playlistId, offset, limit).then(({ playlist, tracks }) => {
        setPlaylist(playlist);
        setTracks(tracks);
      });
    } catch (err) {
      if (err.response.status !== 401) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [playlistId, offset, limit]);

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
            {loading ? (
              <Loader />
            ) : (
              <div>
                {tracks.items && (
                  <div>
                    {tracks.items.map(({ track }) => (
                      <TrackCard track={track} key={track.id} />
                    ))}
                  </div>
                )}
                <Pagination
                  totalResults={tracks.total}
                  currentPage={currentPage}
                  pageSize={limit}
                  paginate={paginate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
