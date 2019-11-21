const config = {
  API_URL: 'https://api.spotify.com/v1',
  AUTH_URL: 'https://accounts.spotify.com/authorize',
  CLIENT_ID: 'c0c756f4efb54120b0ba79c17f7d441e',
  REDIRECT_URI: `${window.location.origin}/callback`,
  SCOPES: ['user-top-read', 'user-read-currently-playing', 'user-read-playback-state'],
};

export default config;
