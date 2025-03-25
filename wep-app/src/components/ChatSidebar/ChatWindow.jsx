import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { TiArrowRightOutline } from "react-icons/ti";


export const ChatWindow = ({ chat, messages }) => {
    return (
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <img src="https://via.placeholder.com/40" alt={chat.name} />
            <div>
              <h3>{chat.name}</h3>
              <p>Stay at home, Stay safe</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="action-button"><MdOutlinePermPhoneMsg /></button>
            <button className="action-button"><CiVideoOn /></button>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isSent ? "sent" : "received"}`}
            >
              {!message.isSent && (
                <img src="https://via.placeholder.com/30" alt={message.sender} className="message-avatar" />
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <button className="attach-button">📎</button>
          <input type="text" placeholder="Type something" />
          <button className="send-button"><TiArrowRightOutline /></button>
        </div>
      </div>
    );
  };