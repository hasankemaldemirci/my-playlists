import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

// Routes
import Playlists from './routes/Playlists';
import Tracks from './routes/Tracks';
import Login from './routes/Login';

const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Router>
      <div className="app">
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={Playlists} />
            <Route path="/:id/:name/tracks" component={Tracks} />
            <Route path="/login" component={Login} />
            {isLoggedIn && <Redirect to="/" />}
          </Switch>
        </Content>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
