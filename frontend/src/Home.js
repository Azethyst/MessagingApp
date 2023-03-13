import "./Home.css";
import { FiUpload, FiPlus } from "react-icons/fi";

const Home = () => {
  return (
    <div className="content">
      <div className="section-profile">
        <h1 className="section-profile-title">Profile</h1>
        <div className="profile-icon">
          <button className="update-profile-icon">
            <FiPlus />
          </button>
        </div>
        <div className="profile-name">Name: </div>
        <div className="profile-id">Profile-ID: </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="profile-description"
          placeholder="About Me..."
        ></textarea>
        <button className="update-description">
          <FiUpload />
        </button>
      </div>
      <div className="section-stats">
        <h1 className="section-stats-title">Stats</h1>
        <div className="number-posts">Number of Posts: 35</div>
        <div className="number-likes">Number of Likes: 20</div>
        <div className="number-dislikes">NUmber of Dislikes: 1000</div>
      </div>
    </div>
  );
};

export default Home;
