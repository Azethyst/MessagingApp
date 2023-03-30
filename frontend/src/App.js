import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import { FiMessageSquare, FiHome } from "react-icons/fi";
import { useState } from "react";
import Home from "./Home";
import Messaging from "./Messaging";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App() {
  const navigate = useNavigate();

  // UI button Visibility Controls
  const [inSignIn, setSignIn] = useState(true);
  const [inSignUp, setSignUp] = useState(false);
  const [inApp, setApp] = useState(false);  

  // Login Controls
  const [isAuthenticated, setAuthentication] = useState(false);

  // User data
  const [getUsername, setUsername] = useState("");
  const [getUserId, setUserId] = useState("");
  const [getPassword, setPassword] = useState("");

  const [getID, setID] = useState("");
  const [isPostMode, setPostMode] = useState(true);
  const [getChannel, setChannel] = useState("");
  const [getRefresh, setRefresh] = useState(true);

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
          {inSignIn && (
            <Link to="/signup">
              <button className="signup" onClick={() => {setSignUp(true); setSignIn(false); setApp(false)}}>Sign Up</button>
            </Link>
          )}
          {inSignIn && (
            <button className="login" onClick={() => {
              if(isAuthenticated){
                navigate("/landing");
                setSignUp(false); 
                setSignIn(false); 
                setApp(true)} 
              else {
                setAuthentication(true);
              }
              }}>
                Log In
            </button>
          )}
          {inSignUp && (
            <Link to="/">
              <button className="signin" onClick={() => {setSignUp(false); setSignIn(true); setApp(false)}}>Sign In</button>
            </Link>
          )}
          {inSignUp && (
            <Link to="/">
              <button className="create-account" onClick={() => {setSignUp(false); setSignIn(true); setApp(false)}}>Create Account</button>
            </Link>
          )}
          {inApp && (
            <Link to="/home">
              <button className="toHome" onClick={() => {setSignUp(false); setSignIn(false); setApp(true)}}>
                <p>Home</p>
                <FiHome />
              </button>
            </Link>
          )}
          {inApp && (
            <Link to="/messaging">
              <button className="toMessaging" onClick={() => {setSignUp(false); setSignIn(false); setApp(true)}}>
                <p>Messaging</p>
                <FiMessageSquare />
              </button>
            </Link>
          )}
          <Routes>
            <Route exact path="/" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/landing" element={<Landing />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/messaging" element={<Messaging getPostMode={isPostMode} setPostMode={setPostMode} getRefresh={getRefresh} setRefresh={setRefresh}/>} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
