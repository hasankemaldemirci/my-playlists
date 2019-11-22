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

function getPlaylistTracks(playlistId, offset, limit) {
  const playlist = axios({
    url: `${apiURL}/playlists/${playlistId}`,
    headers,
  });
  const tracks = axios({
    url: `${apiURL}/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`,
    headers,
  });

  const response = Promise.all([playlist, tracks]).then(res => {
    return {
      playlist: res[0].data,
      tracks: res[1].data,
    }
  });

  return response;
}

export { getUserInfo, getPlaylists, getPlaylistTracks };
