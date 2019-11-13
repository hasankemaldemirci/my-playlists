import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';

// Routes
import Playlists from '../../routes/Playlists/Playlists';
import Tracks from '../../routes/Tracks/Tracks';

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={Playlists} />
          <Route path="/:id/:name/tracks" component={Tracks} />
        </Switch>
      </Content>
      <Footer />
    </div>
  </Router>
);

export default App;
