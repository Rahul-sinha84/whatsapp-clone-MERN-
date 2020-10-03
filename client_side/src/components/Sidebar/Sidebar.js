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

const Sidebar = ({ checkLastMessage }) => {
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
            name lastMessage{message} _id
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

export default Sidebar;
