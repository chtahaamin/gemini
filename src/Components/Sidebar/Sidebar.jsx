import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import assets from '../../assets/assets';
import { context } from '../../context/Context';

const Sidebar = () => {
  const { onSent, prevPrompts, setRecentPrompt,newChat, setShowResult,setPrevPrompts } = useContext(context);
  const [extended, setExtended] = useState(false);

  const handleMenuChange = () => {
    setExtended(!extended);
  };

  const loadProm = async (prompt) => {
    await onSent(prompt);
    setRecentPrompt(prompt);
   
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={handleMenuChange} className="menu" src={assets.menu_icon} alt="Menu icon" />
        <div onClick={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="Plus icon" />
          {extended && <p>new Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadProm(item)} className="recent-entry">
                <img src={assets.message_icon} alt="Message icon" />
                <p>{item.slice(0, 15)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question icon" />
          {extended && <p>help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History icon" />
          {extended && <p>activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Setting icon" />
          {extended && <p>setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
