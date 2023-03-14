import "./SignUp.css";
import { RiAliensFill } from "react-icons/ri";
import { FiUser, FiLock } from "react-icons/fi";

const SignUp = () => {
  return (
    <div>
      <div className="content">
        <h1 className="heading-title">Hello, Welcome To PlanetCord...</h1>
        <div className="box">
          <RiAliensFill className="alien-icon" />
          <div className="sign-up-form">
            <FiUser className="form-icon" />
            <input
              type="text"
              placeholder="Name"
              className="sign-up-input-box"
            />
          </div>
          <div className="sign-up-form">
            <FiUser className="form-icon" />
            <input
              type="text"
              placeholder="Profile ID"
              className="sign-up-input-box"
            />
          </div>
          <div className="sign-up-form">
            <FiLock className="form-icon" />
            <input
              type="text"
              placeholder="Password"
              className="sign-up-input-box"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
