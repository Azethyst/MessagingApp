import "./Landing.css";

const Landing = () => {
  return (
    <div className="content">
      <h1 className="heading-title">Hello, Welcome To PlanetCord...</h1>
      <p className="intro-message">
        Proceed with caution when communicating with aliens. This design was
        inspired by my desire of buying a new ipad so that I dont have to copy
        notes using my laptop. I also want a holographic screen, if possible.
      </p>
      <h2 className="communication">Communcation Status</h2>
      <div className="loading-block">
        <div className="block-one"></div>
        <div className="block-two"></div>
        <div className="block-three"></div>
      </div>
      <h2 className="loading">Loading...</h2>
    </div>
  );
};

export default Landing;
