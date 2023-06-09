import "./Home.css";
import { FiPlus } from "react-icons/fi";

const Home = ({
  getUsername,
  getUserId,
  getNumPosts,
  getNumLikes,
  getNumDislikes,
  getNumReplies,
}) => {
  return (
    <div className="content">
      <div className="section-profile">
        <h1 className="section-profile-title">Profile</h1>
        <div className="profile-icon">
          <button className="update-profile-icon">
            <FiPlus />
          </button>
        </div>
        <div className="profile-name">Name: {getUsername}</div>
        <div className="profile-id">Profile-ID: {getUserId}</div>
      </div>
      <div className="section-stats">
        <h1 className="section-stats-title">Stats</h1>
        <div className="number-posts">Number of Posts: {getNumPosts}</div>
        <div className="number-likes">Number of Likes: {getNumLikes}</div>
        <div className="number-dislikes">
          Number of Dislikes: {getNumDislikes}
        </div>
        <div className="number-replies">Number of Replies: {getNumReplies}</div>
      </div>
    </div>
  );
};

export default Home;
