import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../app/api";
import token from "../../app/auth";

// Styles
import "./Header.scss";

// Components
import LoginButton from "../LoginButton/LoginButton";
import Avatar from "../Avatar/Avatar";

// Images
import SpotifyIcon from "../../img/spotify-icon.png";
import ArrowDown from "../../img/arrow-down.png";

const Header = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);

  // Fetch User Data
  const fetchData = async () => {
    setLoading(true);

    try {
      await getUserInfo().then(res => {
        dispatch({ type: "SET_USER", data: res.data });
      });
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Set user login & user info when token is available
  useEffect(() => {
    if (token) {
      dispatch({ type: "LOGIN" });
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Log Out
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // User Dropdown Toggle
  const toggleUserDropdown = () => {
    !dropdownToggle ? setDropdownToggle(true) : setDropdownToggle(false);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          <img src={SpotifyIcon} alt="Spotify Playlists" />
          My Playlists
        </a>
        {isLoggedIn && !loading ? (
          <div className="user">
            <div
              className={
                dropdownToggle
                  ? "user-display user-display--open"
                  : "user-display"
              }
              onClick={toggleUserDropdown}
            >
              <Avatar name={user.display_name} />
              <figcaption className="user__name">
                {user.display_name}
                <img
                  src={ArrowDown}
                  alt={user.display_name}
                  className="dropdown-arrow"
                />
              </figcaption>
            </div>
            <div
              className="user__dropdown"
              style={
                dropdownToggle ? { display: "block" } : { display: "none" }
              }
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
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
