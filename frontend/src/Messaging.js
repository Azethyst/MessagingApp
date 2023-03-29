import "./Messaging.css";
import { FiSearch, FiSend } from "react-icons/fi";
import { BsArrowReturnLeft } from "react-icons/bs";

const Messaging = (getPostMode, setPostMode, getRefresh, setRefresh) => {
    let display;
    if (getRefresh) {
        if (getPostMode) {
            display = <div>
                        <div className="message-box">
                            <div className="user-icon"></div>
                            <button className="user-message" onClick={(e) => {setPostMode(false); setRefresh(true);}}>Pears are purple here, help!</button>
                        </div>
                        <div className="message-box">
                            <div className="user-icon"></div>
                            <button className="user-message" onClick={(e) => {setPostMode(false); setRefresh(true);}}>Eyy yo, I just evolved netherite eyes</button>
                        </div>
                        <div className="message-box">
                            <div className="user-icon"></div>
                            <button className="user-message" onClick={(e) => {setPostMode(false); setRefresh(true);}}>Damn, when will skip the dishes extend their range to martian soil?</button>
                        </div>
                    </div>;
        } else {
            display = <div>                
                        <button className="return-button" onClick={(e) => {setPostMode(true); setRefresh(true);}}>
                            <BsArrowReturnLeft />
                        </button>
                    </div>;
        }
        setRefresh(false);
    }
    
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
                    Martian Dessert
                </button>
                <button className="group">
                    Elon Fans
                </button>
                <button className="group">
                    Source:Trust me..
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
                {display}
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
