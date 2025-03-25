import { CiSearch } from "react-icons/ci";

export const ChatSidebar = ({ chats, onSelectChat, selectedChat }) => {
    return (
      <div className="chat-sidebar">
        <h2>Chats</h2>
        <div className="search-bar">
          <span className="search-icon"><CiSearch /></span>
          <input type="text" placeholder="Search" />
        </div>
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat.id === chat.id ? "selected" : ""}`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="chat-avatar">
                <img src="https://via.placeholder.com/40" alt={chat.name} />
                <span className={`status-dot ${chat.online ? "online" : "offline"}`}></span>
              </div>
              <div className="chat-info">
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
              <div className="chat-meta">
                <span className="chat-time">{chat.time}</span>
                {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };