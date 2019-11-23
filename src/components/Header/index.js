import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import './style.scss';

// Components
import Avatar from '../Avatar';

// Images
import ArrowDown from '../../img/arrow-down.png';
import Logo from '../../img/logo.png';

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
  }, [dispatch]);

  // User Dropdown Toggle
  const toggleUserDropdown = () => {
    const toggle = !dropdownToggle ? setDropdownToggle(true) : setDropdownToggle(false);
    return toggle;
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          <img src={Logo} alt="My Playlists" />
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
                <span>{user.display_name}</span>
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
