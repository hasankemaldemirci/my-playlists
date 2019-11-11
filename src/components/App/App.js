import React from "react";

// Styles
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import Playlists from "../Playlists/Playlists";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content body={<Playlists />} />
      <Footer />
    </div>
  );
};

export default App;
