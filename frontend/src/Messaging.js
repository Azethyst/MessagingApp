import "./Messaging.css";
import { FiSearch, FiSend } from "react-icons/fi";
import { BiDislike, BiLike } from "react-icons/bi";
import { useState } from "react";
// import { useEffect } from "react";

const Messaging = ({
  getChannels,
  setChannels,
  selectedChannelId,
  selectedChannelName,
  selectedChannelDescription,
  setSelectedChannelId,
  setSelectedChannelName,
  setSelectedChannelDescription,
  getPosts,
  setPosts,
  getUserId,
}) => {
  const [getChannelName, setChannelName] = useState("");
  const [getChannelDescription, setChannelDescription] = useState("");

  const [getCurrentTopic, setCurrentTopic] = useState("");
  const [getCurrentData, setCurrentData] = useState("");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetch(`http://localhost:8080/post/${selectedChannelId}`, {
  //       method: "POST",
  //       body: ``,
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         if (!response.ok) {
  //           setPosts([]);
  //         } else {
  //           setPosts(response);
  //         }
  //       })
  //       .catch((error) => console.error(error));
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div>
      <div className="planets-front">
        <div className="planets-title">PLANETS</div>
        <div className="planet-screen-front">
          <>
            {getChannels.map((channel) => (
              <button
                className="group"
                title={channel.description}
                onClick={() => {
                  fetch(`http://localhost:8080/post/${channel.channelName}`, {
                    method: "POST",
                    body: ``,
                    headers: {
                      "Content-type": "application/x-www-form-urlencoded",
                    },
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      setPosts(response);
                    })
                    .catch((error) => console.error(error));
                  setSelectedChannelId(channel.id);
                  setSelectedChannelName(channel.channelName);
                  setSelectedChannelDescription(channel.description);
                }}
              >
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
                .then((response) => response.text())
                .then((response) => {
                  if (response !== "ok") {
                    alert(`Error: Server cannot Add the New Planet.`);
                  }
                })
                .then(
                  fetch("http://localhost:8080/channel")
                    .then((response) => response.json())
                    .then((response) => setChannels(response))
                )
                .catch((err) => alert(`Error Create: ${err}`));

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
          <div className="chat-title" title={selectedChannelDescription}>
            <>{selectedChannelName}</>
          </div>
          <input type="text" placeholder="Search" className="search-message" />
          <button className="submit-search">
            <FiSearch />
          </button>
        </div>
        <div className="messages">
          <div>
            <>
              {getPosts.map((post) => (
                <div className="message-box">
                  <div className="user-icon">{post.userId}</div>
                  <button className="user-message" onClick={(e) => {}}>
                    <h1>{post.topic}</h1>
                    <p>{post.data}</p>
                  </button>
                  <div className="emotes">
                    <button
                      className="emote-button"
                      onClick={(e) => {
                        fetch(`http://localhost:8080/postEmote/like`, {
                          method: "POST",
                          body: `id=${post.id}&userId=${getUserId}&`,
                          headers: {
                            "Content-type": "application/x-www-form-urlencoded",
                          },
                        })
                          .then((response) => response.text())
                          .then((response) => {
                            if (response !== "ok") {
                              alert("Error: Like was not Sent.");
                            }
                          })
                          .then(() => {
                            fetch(
                              `http://localhost:8080/post/${selectedChannelName}`,
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
                          })
                          .catch((err) => alert(`Error Post: ${err}`));
                      }}
                    >
                      <BiLike /> {post.thumbsUp}
                    </button>
                    <button
                      className="emote-button"
                      onClick={(e) => {
                        fetch(`http://localhost:8080/postEmote/dislike`, {
                          method: "POST",
                          body: `id=${post.id}&userId=${getUserId}&`,
                          headers: {
                            "Content-type": "application/x-www-form-urlencoded",
                          },
                        })
                          .then((response) => response.text())
                          .then((response) => {
                            if (response !== "ok") {
                              alert("Error: Dislike was not Sent.");
                            }
                          })
                          .then(() => {
                            fetch(
                              `http://localhost:8080/post/${selectedChannelName}`,
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
                          })
                          .catch((err) => alert(`Error Post: ${err}`));
                      }}
                    >
                      <BiDislike /> {post.thumbsDown}
                    </button>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
        <div className="message-footer">
          <input
            type="text"
            placeholder="Topic"
            className="post-topic"
            value={getCurrentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            className="post-message"
            value={getCurrentData}
            onChange={(e) => setCurrentData(e.target.value)}
          />
          <button
            className="submit-message"
            onClick={(e) => {
              fetch("http://localhost:8080/postMessage", {
                method: "POST",
                body: `topic=${getCurrentTopic}&data=${getCurrentData}&userId=${getUserId}&channelName=${selectedChannelName}`,
                headers: {
                  "Content-type": "application/x-www-form-urlencoded",
                },
              })
                .then((response) => response.text())
                .then((response) => {
                  if (response !== "ok") {
                    alert("Error: Message was not Sent.");
                  } else {
                    alert("Post Sent!");
                  }
                })
                .then(() => {
                  fetch(`http://localhost:8080/post/${selectedChannelName}`, {
                    method: "POST",
                    body: ``,
                    headers: {
                      "Content-type": "application/x-www-form-urlencoded",
                    },
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      setPosts(response);
                    })
                    .catch((error) => console.error(error));
                  setCurrentTopic("");
                  setCurrentData("");
                })
                .catch((err) => alert(`Error Post: ${err}`));
            }}
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
