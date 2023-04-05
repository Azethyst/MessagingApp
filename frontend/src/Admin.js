import "./Admin.css";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Admin = () => {
  const [getUserMode, setUserMode] = useState(false);
  const [getChannelMode, setChannelMode] = useState(false);
  const [getPostMode, setPostMode] = useState(false);
  const [getReplyMode, setReplyMode] = useState(false);
  const [getCurrentList, setCurrentList] = useState([]);

  return (
    <div className="content">
      <div className="admin-header">
        <button
          className="admin-filter"
          onClick={() => {
            fetch("http://localhost:8080/users")
              .then((response) => response.json())
              .then((response) => {
                setCurrentList(response);
              })
              .catch((err) => alert(`Error Fetching Users: ${err}`));
            setUserMode(true);
            setChannelMode(false);
            setPostMode(false);
            setReplyMode(false);
          }}
        >
          Users
        </button>
        <button
          className="admin-filter"
          onClick={() => {
            fetch("http://localhost:8080/channel")
              .then((response) => response.json())
              .then((response) => {
                setCurrentList(response);
              })
              .catch((err) => alert(`Error Fetching Channels: ${err}`));
            setUserMode(false);
            setChannelMode(true);
            setPostMode(false);
            setReplyMode(false);
          }}
        >
          Channels
        </button>
        <button
          className="admin-filter"
          onClick={() => {
            fetch("http://localhost:8080/getPost")
              .then((response) => response.json())
              .then((response) => {
                setCurrentList(response);
              })
              .catch((err) => alert(`Error Fetching Posts: ${err}`));
            setUserMode(false);
            setChannelMode(false);
            setPostMode(true);
            setReplyMode(false);
          }}
        >
          Posts
        </button>
        <button
          className="admin-filter"
          onClick={() => {
            fetch("http://localhost:8080/replies")
              .then((response) => response.json())
              .then((response) => {
                setCurrentList(response);
              })
              .catch((err) => alert(`Error Fetching Replies: ${err}`));
            setUserMode(false);
            setChannelMode(false);
            setPostMode(false);
            setReplyMode(true);
          }}
        >
          Replies
        </button>
      </div>
      <div className="admin-content">
        {getUserMode &&
          getCurrentList.map((items) => (
            <div className="admin-box">
              <h2 className="admin-data">ID: {items.id}</h2>
              <h2 className="admin-data">Name: {items.name}</h2>
              <h2 className="admin-data">UserID: {items.userId}</h2>
              <button className="exit-admin">
                <AiOutlineClose />
              </button>
            </div>
          ))}
        {getChannelMode &&
          getCurrentList.map((items) => (
            <div className="admin-box">
              <h2 className="admin-data">ID: {items.id}</h2>
              <h2 className="admin-data">Channel Name: {items.channelName}</h2>
              <button className="exit-admin">
                <AiOutlineClose />
              </button>
            </div>
          ))}
        {getPostMode &&
          getCurrentList.map((items) => (
            <div className="admin-box">
              <h2 className="admin-data">ID: {items.id}</h2>
              <h2 className="admin-data">Topic: {items.topic}</h2>
              <h2 className="admin-data">Data: {items.data}</h2>
              <button className="exit-admin">
                <AiOutlineClose />
              </button>
            </div>
          ))}
        {getReplyMode &&
          getCurrentList.map((items) => (
            <div className="admin-box">
              <h2 className="admin-data">ID: {items.id}</h2>
              <h2 className="admin-data">comment: {items.comment}</h2>
              <h2 className="admin-data">Post-ID: {items.postReplyId}</h2>
              <button className="exit-admin">
                <AiOutlineClose />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;
