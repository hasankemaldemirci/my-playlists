const config = {
  API_URL: 'https://api.spotify.com/v1',
  AUTH_URL: 'https://accounts.spotify.com/authorize',
  CLIENT_ID: '00a651d7443c4792884811def58590e8',
  REDIRECT_URI: `${window.location.origin}/callback`,
  SCOPES: ['user-top-read', 'user-read-currently-playing', 'user-read-playback-state'],
};

export default config;
