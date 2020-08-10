import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { getUserInfo } from './app/api';
import isAuthenticated from './app/auth';
import loadable from '@loadable/component';

// Utils
import history from './utils/history';

// Styles
import './App.scss';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

// Routes
const Playlists = loadable(() => import('./routes/Playlists'));
const Tracks = loadable(() => import('./routes/Tracks'));
const Login = loadable(() => import('./routes/Login'));

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // Log Out
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    history.push('/login');
  }, [dispatch]);

  // Fetch User Data
  const fetchData = useCallback(async () => {
    try {
      await getUserInfo().then(res => {
        dispatch({ type: 'LOGIN' });
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
      fetchData();
    }
  }, [dispatch, fetchData]);

  return (
    <Router history={history}>
      <div className="app">
        <Header />
        <Content>
          <Switch>
            <Route exact path="/playlists" component={Playlists} />
            <Route path="/:id/tracks" component={Tracks} />
            <Route path="/login" component={Login} />
            {isLoggedIn && <Redirect to="/playlists" />}
          </Switch>
        </Content>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
