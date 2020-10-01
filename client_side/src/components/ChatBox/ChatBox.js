import React from "react";
import "./ChatBox.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  InsertEmoticon,
  MoreVertRounded,
  SearchRounded,
  Mic,
} from "@material-ui/icons";

const ChatBox = () => {
  return (
    <div className="chatbox">
      <div className="chatbox__header">
        <div className="chatbox__header--dp">
          <Avatar />
        </div>
        <div className="chatbox__header--info">
          <h3>Room Name</h3>
          <p> Last seen at ... </p>
        </div>
        <div className="chatbox__header--icons">
          <IconButton>
            <SearchRounded />
          </IconButton>
          <IconButton>
            <MoreVertRounded />
          </IconButton>
        </div>
      </div>
      <div className="chatbox__main">
        <div className="chatbox__main--chat">
          <h4>Name</h4>
          <p>Message</p>
          <span>Time</span>
        </div>
        <div className="chatbox__main--chat chatbox__main--chat-received">
          <h4>Name</h4>
          <p>Message</p>
          <span>Time</span>
        </div>
        <div className="chatbox__main--chat">
          <h4>Name</h4>
          <p>Message</p>
          <span>Time</span>
        </div>
      </div>
      <div className="chatbox__footer">
        <InsertEmoticon className="chatbox__footer--icon1" />
        <form className="chatbox__footer--input">
          <input placeholder="Type a message" type="text" />
        </form>
        <Mic className="chatbox__footer--icon2" />
      </div>
    </div>
  );
};

export default ChatBox;
