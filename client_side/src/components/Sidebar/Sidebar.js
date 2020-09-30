import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLargeRounded,
  ChatRounded,
  MoreVertRounded,
  SearchRounded,
} from "@material-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header--dp">
          <Avatar src="https://i.pinimg.com/474x/20/62/69/20626905851e066e66764c3385fa4352.jpg" />
        </div>
        <div className="sidebar__header--icon-container">
          <div className="sidebar__header--icon-container__icon1">
            <IconButton>
              <DonutLargeRounded />
            </IconButton>
          </div>
          <div className="sidebar__header--icon-container__icon2">
            <IconButton>
              <ChatRounded />
            </IconButton>
          </div>
          <div className="sidebar__header--icon-container__icon3">
            <IconButton>
              <MoreVertRounded />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search--container">
          <SearchRounded className="sidebar__search--icon" />
          <input
            className="sidebar__search--input"
            placeholder="Search or start new chat"
            type="text"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
        <div className="sidebar__chats--component">
          <Avatar className="sidebar__chats--dp" />
          <div className="sidebar__chats--info">
            <h3>Room Name</h3>
            <p>Last message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
