import "./SignIn.css";
import { RiAliensFill } from "react-icons/ri";
import { FiUser, FiLock } from "react-icons/fi";

const SignIn = () => {
  return (
    <div>
      <div className="content">
        <h1 className="heading-title">Hello, Welcome To PlanetCord...</h1>
        <div className="box">
          <RiAliensFill className="alien-icon" />
          <div className="form">
            <FiUser className="form-icon" />
            <input type="text" placeholder="Profile ID" className="input-box" />
          </div>
          <div className="form">
            <FiLock className="form-icon" />
            <input type="text" placeholder="Password" className="input-box" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
