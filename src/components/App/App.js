import React, { useEffect } from "react";
import { getPlaylists } from "../../app/api";
import token from "../../app/auth";

// Styles
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const App = () => {
  const fetchData = async () => {
    try {
      await getPlaylists().then(res => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};

export default App;
