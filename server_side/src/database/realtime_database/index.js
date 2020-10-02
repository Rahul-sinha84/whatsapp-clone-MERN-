import mongoose from "mongoose";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1079949",
  key: "09208efbb2623f5d3ae0",
  secret: "52194c0bedddc646aebe",
  cluster: "ap2",
  encrypted: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  /******************************connecting messages********************************/
  const msgCollection = db.collection("messages");

  const changeStreamMessages = msgCollection.watch();

  changeStreamMessages.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      //triggering pusher
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        uniqueId: messageDetails.uniqueId,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Some operation besides get request");
    }
  });

  /********************************connecting rooms****************************** */

  const roomCollection = db.collection("rooms");

  const changeStreamRooms = roomCollection.watch();

  changeStreamRooms.on("change", (change) => {
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        _id: roomDetails._id,
        name: roomDetails.name,
        lastMessage: roomDetails.lastMessage,
        messages: roomDetails.messages,
      });
    } else {
      console.log("Some operation besides get request");
    }
  });
});
