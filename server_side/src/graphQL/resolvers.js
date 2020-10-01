import { Message } from "../dbSchema/message";
import { Room } from "../dbSchema/room";

export const resolvers = {
  Query: {
    getAllRooms: () =>
      Room.find()
        .then((response) => response)
        .catch((err) => err),
  },
  Mutation: {
    createMessage: (parent, { _id, name, message, uniqueId, timestamp }) =>
      Message.create({ name, message, uniqueId, timestamp })
        .then((createdMessage) => {
          Room.findById({ _id }).then((foundRoom) => {
            foundRoom.messages.push(createdMessage);
            foundRoom.lastMessage = createdMessage;
            foundRoom.save();
          });
          return createdMessage;
        })
        .catch((err) => err),
    createRoom: (parent, { name }) =>
      Room.create({ name })
        .then((createdRoom) => createdRoom)
        .catch((err) => err),
  },
};
