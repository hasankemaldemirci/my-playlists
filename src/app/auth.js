import hash from '../utils/hash';
import history from '../utils/history';

const isAuthenticated = () => {
  const token = hash.access_token || localStorage.getItem('token');
  if (token) {
    localStorage.setItem('token', token);
  } else {
    history.replace('/login');
  }
  return token;
};

export default isAuthenticated();
