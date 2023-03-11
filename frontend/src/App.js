import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FiMessageSquare, FiHome } from "react-icons/fi";
// import { useState } from "react";
import Home from "./Home";
import Messaging from "./Messaging";
import Landing from "./Landing";

function App() {
  return (
    <div className="App">
      <div className="Materials">
        <div className="title">PlanetCord</div>
        <div className="tablet-front"></div>
        <div className="tablet-back"></div>
        <div className="button-right-front"></div>
        <div className="button-right-back"></div>
        <div className="button-left-front"></div>
        <div className="button-left-back"></div>
        <div className="holo-main"></div>
        <div className="holo-button-right"></div>
        <div className="holo-button-left"></div>
      </div>
      <header className="App-header">
        <div>
          <Router>
            <Link to="/home">
              <button className="toHome">
                <p>Home</p>
                <FiHome />
              </button>
            </Link>
            <Link to="/messaging">
              <button className="toMessaging">
                <p>Messaging</p>
                <FiMessageSquare />
              </button>
            </Link>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/messaging" element={<Messaging />} />
            </Routes>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
