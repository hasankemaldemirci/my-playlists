import React, { useEffect, useState } from "react";
import token from "../../app/auth";
import { getPlaylists } from "../../app/api";

import "./Playlists.scss";

const Playlists = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      await getPlaylists().then(res => {
        setPlaylists(res.data.items);
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  return (
    <div className="playlists">
      <h1 className="hero">My Playlists</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : playlists ? (
        <div className="playlists-wrapper">
          {playlists.map((playlist, index) => {
            return (
              <div className="playlist-card" key={index}>
                {playlist.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Playlists;
