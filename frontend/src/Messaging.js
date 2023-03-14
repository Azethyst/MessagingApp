import "./Messaging.css";
import { FiSearch, FiSend } from "react-icons/fi";

const Messaging = () => {
  return (
    <div>
        <div className="planets-front">
            <div className="planets-title">PLANETS</div>
            <div className="planet-screen-front">
                {/* groups are mapped in here */}
                <button className="group">
                    Plutionian Colony
                </button>
                <button className="group">
                    Plutionian Colony 
                </button>
                <button className="group">
                    Plutionian Colony
                </button>
                <button className="group">
                    Plutionian Colony
                </button>
                <button className="group">
                    Plutionian Colony
                </button>
                <button className="group">
                    Plutionian Colony
                </button>
            </div>
            <div className="planet-screen-back"></div>
        </div>
        <div className="planets-back"></div>
        <div className="add-planets-front">
            <div className="add-planets-title">ADD NEW PLANETS</div>
            <div className="add-planet-screen-front">
                <input type="text" placeholder="Planet Name" className="planet-name"/>
                <input type="text" placeholder="Planet Description" className="planet-description"/>
                <button className="create-planet">Create Planet</button>
            </div>
            <div className="add-planet-screen-back"></div>
        </div>
        <div className="add-planets-back"></div>
        <div className="content">
            <div className="message-header">
                <div className="chat-title">Plutonian Colony</div>
                <input type="text" placeholder="Search" className="search-message"/>
                <button className="submit-search">
                    <FiSearch />
                </button>
            </div>
            <div className="messages">
                {/* This is where all the messages are posted */}
                <div className="message-box">
                    <div className="user-icon"></div>
                    <div className="user-message">HELLO LOSERS</div>
                </div>
                <div className="message-box">
                    <div className="user-icon"></div>
                    <div className="user-message">ITS TIME TO DU DU DU DUEL!!!</div>
                </div>
                <div className="message-box">
                    <div className="self-message">IT'S ON!</div>
                    <div className="self-icon"></div>
                </div>
                <div className="message-box">
                    <div className="self-message">LOSER I SUMMON YOUUUU!!!</div>
                    <div className="self-icon"></div>
                </div>
            </div>
            <div className="message-footer">
                <input type="text" placeholder="Message" className="post-message"/>
                <button className="submit-message">
                    <FiSend/>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Messaging;
