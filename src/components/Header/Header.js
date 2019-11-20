import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../app/api';
import isAuthenticated from '../../app/auth';

// Utils
import history from '../../utils/history';

// Styles
import './Header.scss';

// Components
import Avatar from '../Avatar/Avatar';

// Images
import SpotifyIcon from '../../img/spotify-icon.png';
import ArrowDown from '../../img/arrow-down.png';

const Header = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  const [dropdownToggle, setDropdownToggle] = useState(false);

  const isRouteLogin = useLocation().pathname === '/login';

  // Log Out
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    history.replace('/login');
  }, [dispatch]);

  // Fetch User Data
  const fetchData = useCallback(async () => {
    try {
      await getUserInfo().then(res => {
        dispatch({ type: 'SET_USER', data: res.data });
      });
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      }
    }
  }, [dispatch, logout]);

  // Set user login & user info when token is available
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: 'LOGIN' });
      fetchData();
    }
  }, [dispatch, fetchData]);

  // User Dropdown Toggle
  const toggleUserDropdown = () => {
    const toggle = !dropdownToggle ? setDropdownToggle(true) : setDropdownToggle(false);
    return toggle;
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          <img src={SpotifyIcon} alt="My Playlists" />
          My Playlists
        </a>
        {isLoggedIn && !isRouteLogin && user.display_name && (
          <div className="user">
            <button
              type="button"
              className={dropdownToggle ? 'user-display user-display--open' : 'user-display'}
              onClick={toggleUserDropdown}
              onKeyDown={toggleUserDropdown}
            >
              <Avatar name={user.display_name} />
              <figcaption className="user__name">
                {user.display_name}
                <img src={ArrowDown} alt={user.display_name} className="dropdown-arrow" />
              </figcaption>
            </button>
            <div
              className="user__dropdown"
              style={dropdownToggle ? { display: 'block' } : { display: 'none' }}
            >
              <ul>
                <li>
                  <a href="!#" onClick={logout}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
