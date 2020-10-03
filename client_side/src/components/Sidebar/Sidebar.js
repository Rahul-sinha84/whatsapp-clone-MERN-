import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLargeRounded,
  ChatRounded,
  MoreVertRounded,
  SearchRounded,
} from "@material-ui/icons";
import Pusher from "pusher-js";
import SidebarChat from "../SidebarChat";
import fetchGraphQL from "../../apis/fetchGraphQL";
import { connect } from "react-redux";

var newRoomAdded = 0;

const addNewRoom = async () => {
  const newRoom = prompt("Name of new Room...");
  await fetchGraphQL.post("/graphql", {
    query: `
      mutation{
        createRoom(name:"${newRoom}"){
          name lastMessage {
            message
          }
        }
      }
    `,
  });
  newRoomAdded++;
};

const Sidebar = ({ checkLastMessage, currentUser }) => {
  const [rooms, setRoom] = useState([]);
  /*******************************************for pusher(ROOM)**************** */
  useEffect(() => {
    const pusher = new Pusher("09208efbb2623f5d3ae0", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (recentRoom) {
      setRoom([...rooms, recentRoom]);
    });
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [newRoomAdded]);
  /*********************************************For fetching all Rooms******************** */

  useEffect(() => {
    (async () => {
      const response = await fetchGraphQL.post("/graphql", {
        query: `
        query{
          getAllRooms{
            name lastMessage{message uniqueId} _id
          }
        }
        `,
      });
      setRoom(response.data.data.getAllRooms);
    })();
  }, [newRoomAdded, checkLastMessage, rooms.length]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header--dp">
          <Avatar src={currentUser.photoURL} />
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
        <div key={0} className="sidebar__chats--add" onClick={addNewRoom}>
          <h3>Add new Chat</h3>
        </div>
        {rooms.map((val) => (
          <SidebarChat key={val._id} newChat={val} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps)(Sidebar);
