import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SidebarChat = ({ newChat, currentUser }) => {
  return newChat.lastMessage ? (
    <Link to={`/rooms/${newChat._id}`} className="link">
      <div className="sidebar__chats--component">
        <Avatar className="sidebar__chats--dp" />
        <div className="sidebar__chats--info">
          <h3>{newChat.name}</h3>
          <p>
            {newChat.lastMessage.uniqueId === currentUser.uid
              ? `You:${newChat.lastMessage.message}`
              : newChat.lastMessage.message}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/rooms/${newChat._id}`} className="link">
      <div className="sidebar__chats--component">
        <Avatar className="sidebar__chats--dp" />
        <div className="sidebar__chats--info">
          <h3>{newChat.name}</h3>
          <p></p>
        </div>
      </div>
    </Link>
  );
};
const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(SidebarChat);
