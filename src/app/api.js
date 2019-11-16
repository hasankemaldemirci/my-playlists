import axios from 'axios';
import token from './auth';

const apiURL = process.env.REACT_APP_SPOTIFY_API;
const headers = { Authorization: `Bearer ${token}` };

function getUserInfo() {
  const response = axios({
    url: `${apiURL}/me`,
    headers,
  });

  return response;
}

function getPlaylists() {
  const response = axios({
    url: `${apiURL}/me/playlists`,
    headers,
  });

  return response;
}

function getPlaylistTracks(playlistId) {
  const response = axios({
    url: `${apiURL}/playlists/${playlistId}`,
    headers,
  });

  return response;
}

export { getUserInfo, getPlaylists, getPlaylistTracks };
