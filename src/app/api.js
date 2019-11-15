import axios from 'axios';
import token from './auth';

const apiURL = process.env.REACT_APP_SPOTIFY_API;
const headers = { Authorization: `Bearer ${token}` };

export const getUserInfo = () => {
  const response = axios({
    url: `${apiURL}/me`,
    headers,
  });

  return response;
};

export const getPlaylists = () => {
  const response = axios({
    url: `${apiURL}/me/playlists`,
    headers,
  });

  return response;
};

export const getPlaylistTracks = async (playlistId) => {
  const playlist = await axios({
    url: `${apiURL}/playlists/${playlistId}`,
    headers,
  });
  const tracks = await axios({
    url: `${apiURL}/playlists/${playlistId}/tracks`,
    headers,
  });

  const response = Promise.all([playlist.data, tracks.data]);

  return response;
};
