import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

const SidebarChat = ({ newChat }) => {
  return (
    <Link to={`/rooms/${newChat._id}`} className="link">
      <div className="sidebar__chats--component">
        <Avatar className="sidebar__chats--dp" />
        <div className="sidebar__chats--info">
          <h3>{newChat.name}</h3>
          <p>{!newChat.lastMessage ? "" : newChat.lastMessage.message}</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
