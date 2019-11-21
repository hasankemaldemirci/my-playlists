import axios from 'axios';
import token from './auth';
import config from './config';

const apiURL = config.API_URL;
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
