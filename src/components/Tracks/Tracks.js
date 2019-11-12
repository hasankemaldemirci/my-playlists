import React, { useEffect, useState } from "react";
import { getPlaylistTracks } from "../../app/api";

// Styles
import "./Tracks.scss";

// Components
import Loader from "../Loader/Loader";

const Tracks = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState([]);

  const playlistId = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await getPlaylistTracks(playlistId).then(res => {
          setTracks(res.data.items);
        });
      } catch (error) {
        setError(error);
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
      <h1 className="hero">{props.match.params.name}'s Tracks</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : tracks ? (
        <div className="tracks-wrapper">
          {tracks.map(({ track }, index) => {
            return <div key={index}>{track.name}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Tracks;
