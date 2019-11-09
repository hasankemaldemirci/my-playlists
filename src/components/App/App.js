import React from "react";

// Styles
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Playlists from "../Playlists/Playlists";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          <Playlists />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
