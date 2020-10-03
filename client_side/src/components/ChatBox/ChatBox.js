import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { Avatar, IconButton } from "@material-ui/core";
import Pusher from "pusher-js";
import {
  InsertEmoticon,
  MoreVertRounded,
  SearchRounded,
  Mic,
} from "@material-ui/icons";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import fetchGraphQL from "../../apis/fetchGraphQL";
import { connect } from "react-redux";

const ChatBox = ({ noOfMessage, currentUser }) => {
  const { roomId } = useParams();
  //for storing the details current data
  const [room, setRoom] = useState({});
  //for messages in that room
  const [messages, setMessages] = useState([]);
  //for input bar
  const [input, setInput] = useState("");
  /*********************************Pusher only for messages*************** */
  useEffect(() => {
    const pusher = new Pusher("09208efbb2623f5d3ae0", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (recentRoom) {
      setMessages([...messages, recentRoom]);
      noOfMessage(Math.random());
    });
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [messages.length]);
  /*********************************for room ****************************** */
  useEffect(() => {
    (async () => {
      const response = await fetchGraphQL.post("/graphql", {
        query: `
          query {
            getRoom(_id:"${roomId}"){
              name lastMessage{
                _id
              }
            }
          }
        `,
      });
      const currentRoom = response.data.data.getRoom;
      setRoom(currentRoom);
    })();
  }, [roomId, messages.length]);
  /*******************************for messages******************************* */
  useEffect(() => {
    (async () => {
      const response = await fetchGraphQL.post("/graphql", {
        query: `
          query{
            getRoom(_id:"${roomId}"){
              messages{
                name message timestamp _id uniqueId
              }
            }
          }
        `,
      });
      const messagesInCurrentRoom = response.data.data.getRoom.messages;
      setMessages(messagesInCurrentRoom);
      noOfMessage(Math.random());
    })();
  }, [messages.length, roomId]);
  /*************************************form submission**************************** */
  const formSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }
    fetchGraphQL
      .post("/graphql", {
        query: `
        mutation{
          createMessage(_id:"${roomId}",name:"${
          currentUser.displayName
        }", message:"${input}", timestamp:"${new Date().getHours()}:${new Date().getMinutes()}",uniqueId:"${
          currentUser.uid
        }" ){
            message
          }
        }
      `,
      })
      .then((response) => response.data.data.createMessage)
      .catch((err) => err);
    setInput("");
  };
  /*************************************Returning********************************** */
  return (
    <div className="chatbox">
      <div className="chatbox__header">
        <div className="chatbox__header--dp">
          <Avatar />
        </div>
        <div className="chatbox__header--info">
          <h3>{room.name}</h3>
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
        {messages.map((val) => (
          <div
            key={val._id}
            className={`chatbox__main--chat ${
              val.uniqueId === currentUser.uid
                ? "chatbox__main--chat-received"
                : ""
            }`}
          >
            <h4>{val.name}</h4>
            <p>{val.message}</p>
            <span>{val.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="chatbox__footer">
        <InsertEmoticon className="chatbox__footer--icon1" />
        <form className="chatbox__footer--input" onSubmit={formSubmit}>
          <input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
        </form>
        <Mic className="chatbox__footer--icon2" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(ChatBox);
