import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

const SidebarChat = ({ newChat }) => {
  return (
    <div key={newChat._id} className="sidebar__chats--component">
      <Avatar className="sidebar__chats--dp" />
      <div className="sidebar__chats--info">
        <h3>{newChat.name}</h3>
        <p>{newChat.lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
