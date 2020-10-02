import { Message } from "../database/dbSchema/message";
import { Room } from "../database/dbSchema/room";

export const resolvers = {
  Query: {
    getAllRooms: () =>
      Room.find()
        .then((response) => response)
        .catch((err) => err),
    getRoom: (parent, { _id }) =>
      Room.findById(_id)
        .then((foundRoom) => foundRoom)
        .catch((err) => err),
  },
  Mutation: {
    createMessage: (parent, { _id, name, message, uniqueId, timestamp }) =>
      Message.create({ name, message, uniqueId, timestamp })
        .then((createdMessage) => {
          Room.findById({ _id })
            .then((foundRoom) => {
              foundRoom.messages.push(createdMessage);
              foundRoom.lastMessage = createdMessage;
              foundRoom.save();
            })
            .catch((err) => err);
          return createdMessage;
        })
        .catch((err) => err),
    createRoom: (parent, { name }) =>
      Room.create({ name })
        .then((createdRoom) => createdRoom)
        .catch((err) => err),
  },
};
