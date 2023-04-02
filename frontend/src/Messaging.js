import "./Messaging.css";
import { FiSearch, FiSend } from "react-icons/fi";
import { BiDislike, BiLike } from "react-icons/bi";
import { useState } from "react";

const Messaging = ({ getChannels, setChannels }) => {
  const [getChannelName, setChannelName] = useState("");
  const [getChannelDescription, setChannelDescription] = useState("");

  return (
    <div>
      <div className="planets-front">
        <div className="planets-title">PLANETS</div>
        <div className="planet-screen-front">
          <>
            {getChannels.map((channel) => (
              <button className="group" title={channel.description}>
                {channel.channelName}
              </button>
            ))}
          </>
        </div>
        <div className="planet-screen-back"></div>
      </div>
      <div className="planets-back"></div>
      <div className="add-planets-front">
        <div className="add-planets-title">ADD NEW PLANETS</div>
        <div className="add-planet-screen-front">
          <input
            type="text"
            placeholder="Planet Name"
            className="planet-name"
            value={getChannelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Planet Description"
            className="planet-description"
            value={getChannelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
          />
          <button
            className="create-planet"
            onClick={() => {
              fetch("http://localhost:8080/channel", {
                method: "POST",
                body: `channelName=${getChannelName}&description=${getChannelDescription}`,
                headers: {
                  "Content-type": "application/x-www-form-urlencoded",
                },
              })
                .then((response) => {
                  if (response.status !== 200) {
                    alert(`Error: Server cannot Add the New Planet.`);
                  }
                })
                .then(
                  fetch("http://localhost:8080/channel")
                    .then((response) => response.json())
                    .then((response) => setChannels(response))
                )
                .catch((err) => alert(`Error Login: ${err}`));

              setChannelName("");
              setChannelDescription("");
            }}
          >
            Create Planet
          </button>
        </div>
        <div className="add-planet-screen-back"></div>
      </div>
      <div className="add-planets-back"></div>
      <div className="content">
        <div className="message-header">
          <div className="chat-title" title="WOW">
            Plutonian Colony
          </div>
          <input type="text" placeholder="Search" className="search-message" />
          <button className="submit-search">
            <FiSearch />
          </button>
        </div>
        <div className="messages">
          <div>
            {/* This is where the posts will be mapped */}
            <div className="message-box">
              <div className="user-icon"></div>
              <button className="user-message" onClick={(e) => {}}>
                <h1>Help with food supply.</h1>
                <p>Pears are purple here, help!</p>
              </button>
              <div className="emotes">
                <button className="emote-button">
                  <BiLike /> 12
                </button>
                <button className="emote-button">
                  <BiDislike /> 235
                </button>
              </div>
            </div>

            <div className="message-box">
              <div className="user-icon"></div>
              <button className="user-message" onClick={(e) => {}}>
                <h1>Dope.</h1>
                <p>Eyy yo, I just evolved netherite eyes...</p>
              </button>
              <div className="emotes">
                <button className="emote-button">
                  <BiLike /> 12
                </button>
                <button className="emote-button">
                  <BiDislike /> 235
                </button>
              </div>
            </div>

            <div className="message-box">
              <div className="user-icon"></div>
              <button className="user-message" onClick={(e) => {}}>
                <h1>Elon FTW.</h1>
                <p>
                  Damn, when will skip the dishes extend their range to martian
                  soil?
                </p>
              </button>
              <div className="emotes">
                <button className="emote-button">
                  <BiLike /> 12
                </button>
                <button className="emote-button">
                  <BiDislike /> 235
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="message-footer">
          <input type="text" placeholder="Message" className="post-message" />
          <button className="submit-message">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
