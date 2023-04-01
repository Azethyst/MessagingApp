import "./SignIn.css";
import { RiAliensFill } from "react-icons/ri";
import { FiUser, FiLock } from "react-icons/fi";

const SignIn = ({ getUserId, setUserId, getPassword, setPassword }) => {
  return (
    <div>
      <div className="content">
        <h1 className="heading-title">Hello, Welcome To PlanetCord...</h1>
        <div className="box">
          <RiAliensFill className="alien-icon" />
          <div className="form">
            <FiUser className="form-icon" />
            <input
              type="text"
              placeholder="Profile ID"
              className="input-box"
              value={getUserId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form">
            <FiLock className="form-icon" />
            <input
              type="password"
              placeholder="Password"
              className="input-box"
              value={getPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
