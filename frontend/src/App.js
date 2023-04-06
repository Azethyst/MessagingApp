import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FiMessageSquare, FiHome } from "react-icons/fi";
import { useState } from "react";
// import { useEffect } from "react";
import Home from "./Home";
import Messaging from "./Messaging";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Admin from "./Admin";

function App() {
  const navigate = useNavigate();

  // UI button Visibility Controls
  const [inSignIn, setSignIn] = useState(true);
  const [inSignUp, setSignUp] = useState(false);
  const [inApp, setApp] = useState(false);
  const [inHome, setHome] = useState(false);

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

  // Channel Controls
  const [getChannels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(0);
  const [selectedChannelName, setSelectedChannelName] =
    useState("Select Channel");
  const [selectedChannelDescription, setSelectedChannelDescription] = useState(
    "Please select a Channel to start Post Messages"
  );

  // Post Controls
  const [getPosts, setPosts] = useState([]);
  const [getPostMode, setPostMode] = useState(true);
  const [getSelectedPostTopic, setSelectedPostTopic] = useState("");
  const [getSelectedPostData, setSelectedPostData] = useState("");
  const [getSelectedPostUserId, setSelectedPostUserId] = useState("");
  const [getSelectedPostId, setSelectedPostId] = useState(0);

  // Reply Controls
  const [getReturnState, setReturnState] = useState([]);

  // Search Mode
  const [getSearchMode, setSearchMode] = useState(true); // true = text, false = user
  const [getTempSearchHolder, setTempSearchHolder] = useState([]);

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
        {inApp &&
          inHome &&
          getUsername === "Administrator" &&
          getUserId === "admin" && (
            <>
              <div className="to-admin-back"></div>
              <div className="to-admin-front"></div>
              <div className="to-admin-holo"></div>
            </>
          )}
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
                  .then((response) => response.text())
                  .then((response) => {
                    if (response !== "ok") {
                      alert(
                        `Error: Invalid Data Sent, or Account already exists.`
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
                      if (obj.status !== 200) {
                        alert("Error: Credentials not Validated, Sign In.");
                      } else {
                        setUsername(obj.body.name);
                        setNumPosts(obj.body.numPosts);
                        setNumLikes(obj.body.numLikes);
                        setNumDislikes(obj.body.numDislikes);
                        setNumReplies(obj.body.numReplies);
                      }
                    })
                    .catch((err) => alert(`Error Login: ${err}`));
                  setSignUp(false);
                  setSignIn(false);
                  setApp(true);
                  setHome(true);
                  setPostMode(true);
                  setSelectedPostTopic("");
                  setSelectedPostData("");
                  setSelectedPostUserId("");
                  setSelectedPostId(0);
                  setReturnState([]);
                  setTempSearchHolder([]);
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
                  fetch("http://localhost:8080/channel")
                    .then((response) => response.json())
                    .then((response) => {
                      setChannels(response);
                      if (response.length !== 0) {
                        setSelectedChannelId(response[0].id);
                        setSelectedChannelName(response[0].channelName);
                        setSelectedChannelDescription(response[0].description);
                        fetch(
                          `http://localhost:8080/post/${response[0].channelName}`,
                          {
                            method: "POST",
                            body: ``,
                            headers: {
                              "Content-type":
                                "application/x-www-form-urlencoded",
                            },
                          }
                        )
                          .then((response) => response.json())
                          .then((response) => {
                            setPosts(response);
                          })
                          .catch((error) => console.error(error));
                      } else {
                        setSelectedChannelId(0);
                        setSelectedChannelName("Select Channel");
                        setSelectedChannelDescription("");
                        setReturnState([]);
                        setPosts([]);
                        setSearchMode(true);
                        setTempSearchHolder([]);
                      }
                    })
                    .catch((err) => alert(`Error Login: ${err}`));
                  setSignUp(false);
                  setSignIn(false);
                  setApp(true);
                  setHome(false);
                  setPostMode(true);
                  setSelectedPostTopic("");
                  setSelectedPostData("");
                  setSelectedPostUserId("");
                  setSelectedPostId(0);
                }}
              >
                <p>Messaging</p>
                <FiMessageSquare />
              </button>
            </Link>
          )}
          {inApp &&
            inHome &&
            getUsername === "Administrator" &&
            getUserId === "admin" && (
              <Link to="/admin">
                <button
                  className="toAdmin"
                  onClick={() => {
                    setHome(false);
                  }}
                >
                  ADMIN MODE
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
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/messaging"
              element={
                <Messaging
                  getChannels={getChannels}
                  setChannels={setChannels}
                  selectedChannelId={selectedChannelId}
                  selectedChannelName={selectedChannelName}
                  selectedChannelDescription={selectedChannelDescription}
                  setSelectedChannelId={setSelectedChannelId}
                  setSelectedChannelName={setSelectedChannelName}
                  setSelectedChannelDescription={setSelectedChannelDescription}
                  getPosts={getPosts}
                  setPosts={setPosts}
                  getUserId={getUserId}
                  getPostMode={getPostMode}
                  setPostMode={setPostMode}
                  getSelectedPostTopic={getSelectedPostTopic}
                  setSelectedPostTopic={setSelectedPostTopic}
                  getSelectedPostData={getSelectedPostData}
                  setSelectedPostData={setSelectedPostData}
                  getSelectedPostUserId={getSelectedPostUserId}
                  setSelectedPostUserId={setSelectedPostUserId}
                  getSelectedPostId={getSelectedPostId}
                  setSelectedPostId={setSelectedPostId}
                  getReturnState={getReturnState}
                  setReturnState={setReturnState}
                  getSearchMode={getSearchMode}
                  setSearchMode={setSearchMode}
                  getTempSearchHolder={getTempSearchHolder}
                  setTempSearchHolder={setTempSearchHolder}
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
