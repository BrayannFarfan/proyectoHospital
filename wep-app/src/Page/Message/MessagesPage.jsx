import { useState } from "react";
import "./MessagesPage.css";
import {ChatSidebar} from "../../components/ChatSidebar/ChatSidebar";
import {ChatWindow} from "../../components/ChatSidebar/ChatWindow";

// Datos simulados para los chats
const chats = [
  { id: 1, name: "Rex Allen", lastMessage: "Hey, How are you?", time: "12 min", unread: 0, online: true },
  { id: 2, name: "Bradshaw", lastMessage: "Hey, How are you?", time: "4:32 PM", unread: 0, online: true },
  { id: 3, name: "Julia Jhones", lastMessage: "Hey, How are you?", time: "1:40 PM", unread: 2, online: true },
  { id: 4, name: "Anderson", lastMessage: "Hey, How are you?", time: "9:20 AM", unread: 0, online: false },
  { id: 5, name: "Amelia Anna", lastMessage: "Hey, How are you?", time: "1 day ago", unread: 6, online: true },
  { id: 6, name: "Samuel Daniels", lastMessage: "Hey, How are you?", time: "2 days ago", unread: 0, online: false },
  { id: 7, name: "Paolo Dyabala", lastMessage: "Hey, How are you?", time: "6/8/2020", unread: 0, online: false },
  { id: 7, name: "Paolo Dyabala", lastMessage: "Hey, How are you?", time: "6/8/2020", unread: 0, online: false },
  { id: 7, name: "Paolo Dyabala", lastMessage: "Hey, How are you?", time: "6/8/2020", unread: 0, online: false },
  { id: 7, name: "Paolo Dyabala", lastMessage: "Hey, How are you?", time: "6/8/2020", unread: 0, online: false },
];

// Datos simulados para los mensajes de un chat
const messages = [
  { id: 1, sender: "Bradshaw", text: "Lorem ipsum dolor sit amet consectetur adipiscing sed.", time: "4:32 PM", isSent: false },
  { id: 2, sender: "Bradshaw", text: "Dolor sit amet consectetur", time: "4:30 PM", isSent: false },
  { id: 3, sender: "Me", text: "Lorem ipsum dolor sit amet consectetur adipiscing sed.", time: "4:40 PM", isSent: true },
  { id: 4, sender: "Me", text: "Dolor sit amet consectetur", time: "4:42 PM", isSent: true },
];

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(chats[1]); // Chat seleccionado por defecto (Bradshaw)

  return (
    <div className="messages-page">
      <ChatSidebar chats={chats} onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      <ChatWindow chat={selectedChat} messages={messages} />
    </div>
  );
};

export default MessagesPage;