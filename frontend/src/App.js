import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FiMessageSquare, FiHome } from "react-icons/fi";
import { useState } from "react";
import Home from "./Home";
import Messaging from "./Messaging";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App() {
  const navigate = useNavigate();

  //Initialize & Reload
  const [getInit, setInit] = useState(true);

  if (getInit) {
    fetch("http://localhost:8080/init");
    setInit(false);
  }

  // UI button Visibility Controls
  const [inSignIn, setSignIn] = useState(true);
  const [inSignUp, setSignUp] = useState(false);
  const [inApp, setApp] = useState(false);

  // Sign Up Controls
  const [signName, setSignName] = useState("");
  const [signId, setSignId] = useState("");
  const [signPassword, setSignPassword] = useState("");

  // Login Controls
  const [getUsername, setUsername] = useState("");
  const [getUserId, setUserId] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getNumPosts, setNumPosts] = useState(0);
  const [getNumLikes, setNumLikes] = useState(0);
  const [getNumDislikes, setNumDislikes] = useState(0);
  const [getNumReplies, setNumReplies] = useState(0);

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
              <button
                className="signup"
                onClick={() => {
                  setUserId("");
                  setPassword("");
                  setSignUp(true);
                  setSignIn(false);
                  setApp(false);
                }}
              >
                Sign Up
              </button>
            </Link>
          )}
          {inSignIn && (
            <button
              className="login"
              onClick={() => {
                fetch("http://localhost:8080/login", {
                  method: "POST",
                  body: `userId=${getUserId}&password=${getPassword}`,
                  headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                  },
                })
                  .then((response) =>
                    response.json().then((data) => ({
                      status: response.status,
                      body: data,
                    }))
                  )
                  .then((obj) => {
                    console.log(obj.body);
                    if (obj.status !== 200) {
                      alert("Error: Incorrect Username or Password.");
                    } else {
                      setUsername(obj.body.name);
                      setNumPosts(obj.body.numPosts);
                      setNumLikes(obj.body.numLikes);
                      setNumDislikes(obj.body.numDislikes);
                      setNumReplies(obj.body.numReplies);
                      navigate("/landing");
                      setSignUp(false);
                      setSignIn(false);
                      setApp(true);
                    }
                  })
                  .catch((err) => alert(`Error Login: ${err}`));
              }}
            >
              Log In
            </button>
          )}
          {inSignUp && (
            <Link to="/">
              <button
                className="signin"
                onClick={() => {
                  setSignName("");
                  setSignId("");
                  setSignPassword("");
                  setSignUp(false);
                  setSignIn(true);
                  setApp(false);
                }}
              >
                Sign In
              </button>
            </Link>
          )}
          {inSignUp && (
            <button
              className="create-account"
              onClick={() => {
                fetch("http://localhost:8080/signup", {
                  method: "POST",
                  body: `name=${signName}&userId=${signId}&password=${signPassword}`,
                  headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                  },
                })
                  .then((response) => {
                    if (response.status !== 200) {
                      alert(
                        `Error: Invalid Data Sent , or Account already exists.`
                      );
                    } else {
                      alert(`Successfully created and Account.`);
                    }
                  })
                  .catch((err) => alert(`Error Login: ${err}`));
                setSignName("");
                setSignId("");
                setSignPassword("");
              }}
            >
              Create Account
            </button>
          )}
          {inApp && (
            <Link to="/home">
              <button
                className="toHome"
                onClick={() => {
                  setSignUp(false);
                  setSignIn(false);
                  setApp(true);
                }}
              >
                <p>Home</p>
                <FiHome />
              </button>
            </Link>
          )}
          {inApp && (
            <Link to="/messaging">
              <button
                className="toMessaging"
                onClick={() => {
                  setSignUp(false);
                  setSignIn(false);
                  setApp(true);
                }}
              >
                <p>Messaging</p>
                <FiMessageSquare />
              </button>
            </Link>
          )}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <SignIn
                  getUserId={getUserId}
                  setUserId={setUserId}
                  getPassword={getPassword}
                  setPassword={setPassword}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  signName={signName}
                  setSignName={setSignName}
                  signId={signId}
                  setSignId={setSignId}
                  signPassword={signPassword}
                  setSignPassword={setSignPassword}
                />
              }
            />
            <Route path="/landing" element={<Landing />} />
            <Route
              path="/home"
              element={
                <Home
                  getUsername={getUsername}
                  getUserId={getUserId}
                  getNumPosts={getNumPosts}
                  getNumLikes={getNumLikes}
                  getNumDislikes={getNumDislikes}
                  getNumReplies={getNumReplies}
                />
              }
            />
            <Route
              path="/messaging"
              element={
                <Messaging
                  getPostMode={isPostMode}
                  setPostMode={setPostMode}
                  getRefresh={getRefresh}
                  setRefresh={setRefresh}
                />
              }
            />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
