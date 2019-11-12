import React, { useEffect, useState } from "react";
import token from "../../app/auth";
import { getPlaylists } from "../../app/api";

// Styles
import "./Playlists.scss";

// Components
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";
import Loader from "../../components/Loader/Loader";

const Playlists = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      await getPlaylists().then(res => {
        setPlaylists(res.data.items);
      });
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        <Loader />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : playlists ? (
        <div className="playlists-wrapper">
          {playlists.map((playlist, index) => {
            return (
              <PlaylistCard
                playlist={playlist}
                hash={props.location.hash}
                key={index}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Playlists;
