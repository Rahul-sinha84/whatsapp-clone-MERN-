import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAllRooms: [Room!]!
    getRoom(_id: ID!): Room!
  }
  type Room {
    _id: ID!
    name: String!
    lastMessage: Message
    messages: [Message]
  }
  type Message {
    _id: ID!
    name: String!
    message: String!
    uniqueId: String!
    timestamp: String!
  }
  type Mutation {
    createMessage(
      _id: ID!
      name: String!
      message: String!
      uniqueId: String!
      timestamp: String!
    ): Message
    createRoom(name: String!): Room!
  }
`;
