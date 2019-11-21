import parseToken from '../utils/parseToken';
import history from '../utils/history';

const isAuthenticated = () => {
  const token = parseToken() || localStorage.getItem('token');
  if (token) {
    localStorage.setItem('token', token);
  } else {
    console.log('Redirected to login.');
    history.replace('/login');
  }
  return token;
};

export default isAuthenticated();
